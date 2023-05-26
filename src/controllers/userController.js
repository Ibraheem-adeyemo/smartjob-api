import { constStrings } from "../constants";
import { addOTPtoDB, createUser, findUserByEmail, getAuserWithPK, login, udpdateUser } from "../services/user";
import { ErrorResponse } from "../utils/ErrorResponse"
import { composeCourierVerificationMail, composeVerificationMail, courierMailSender, generateOTP, generateToken, hashPassword, sendEmail, sendMail, sendSmsOtp, transporter, verifyToken } from "../utils/helpers"
import Responses from "../utils/Responses"
import { authSchema, loginSchema } from "../utils/validations/authValidation";
import {UserActivation } from '../../dbase/models'
import { generateRandomString } from "../utils/function";
import { User, Profile } from '../../dbase/models'

const secret = process.env.SECRET

import { PHONE_ALREADY_EXISTS_ERR,
     EMAIL_ALREADY_EXIST,
     EMAIL_VERIFIED_SUCCESSFULLY,
     ACCOUNT_HAS_ALREADY_VERIFIED,
     PHONE_OTP_SENT, ACCOUNT_HAS_NOT_BEEN_VERIFIED,
     EMAIIL_CAN_NOT_BE_FOUND,
     INCORECT_OTP, LOGIN_SUCCESSFUL } from '../constants'

const signupController = async (req, res, next) => {
    try {
        let user
        const { host } = req.headers;
        const {name, email, password, username} = req.body
        if(!name || !email || !password) {
            next({status:400, message: 'you must provide your full name, email and password before you can create an account'});
            return
        }

        const [firstName, lastName] = name.split(' ')
        const userObj = {firstName, lastName, email, password, username }
        if(username) {
            user = User.findOne({where: {username}}) 
            if(user.username) {
                next({status:403, message:USERNAME_IS_NOT_AVAILABLE})
                return
            }
        }
        let { error, value} = authSchema.validate(userObj)
        
        if(error) return next({status:400, message: error.details[0].message})
        
        const emailExist = await User.findOne({where:{email}})

        if(emailExist) {
            next({status:400, message:EMAIL_ALREADY_EXIST})
            return
        }
        
        const hashedPassword = await hashPassword(value.password)

        // // token should ve removed from the database
        value = {...value, password:hashedPassword}


        // const userResponse = await createUser(value)
        user = await User.create(value);

        const OTP = generateOTP(6)

        const activation = await  addOTPtoDB(OTP, user.id)


       const otp = activation.otp
       const userEmail = user.email
       const userId = user.id

        const {msg, verifyEmail} = constStrings
        
        
        const jwtToken = generateToken({email:user.email, id:user.id})
        
        const emailData = {
            recipientEmail:userEmail,
            otp,
            userId,
            host,
            userFullName:name
        }
        
        sendMail(emailData, verifyEmail)
        // sendSmsOtp({phoneNumber:user.phoneNumber, OTP:`Your OTP is ${OTP}`}, next)
            
        // const courierRes = await courierMailSender({name:'', recipien: userEmail, content: composeCourierVerificationMail(userEmail, host, token)})
        Responses.setSuccess(201,msg, {jwtToken, data: {...user.dataValues, password:''}});
        Responses.send(res)  
    } catch (error) {
        next({message:error && error.message ? error.message :constStrings.databaseError, statusCode:500})
    }
}

const loginController = async (req, res, next) => {
    try {
        const {email, password} = req.body
       
        const userObj = {email, password}

        let {error, value} = loginSchema.validate(userObj)

        if(error) return next(new ErrorResponse(error.message, 400))

        
        const userRes = await login(userObj)

        if(!userRes.isVerified) {
            return next({statusCode:400, message:ACCOUNT_HAS_NOT_BEEN_VERIFIED})
        }
        
        const token = generateToken({id: userRes.id, email:userRes.email})
        const data = {
            id:userRes.id, 
            firstName:userRes.firstName, 
            lastName:userRes.lastName, 
            email:userRes.email, 
            phoneNumber:userRes.phoneNumber,
            isVerified:userRes.isVerified
        }

        const msg = constStrings.msg
        Responses.setSuccess(200, LOGIN_SUCCESSFUL, {token, data});
        Responses.send(res)
    } catch (error) {
        console.log(JSON.parse(JSON.stringify(error)), 3)
        next({message:constStrings.databaseError, statusCode:500})
    }
}

const verifyOTPController = async (req, res, next) => {
    try {
        const { otp } = req.body;
        const user = res.locals.user;

        const userActivation = await UserActivation.findOne({
            where:{userId:user.id}
        })
        
        if(!userActivation) {
            next({status:403, message:ACCOUNT_HAS_ALREADY_VERIFIED});
            return
        }
        if(userActivation.otp !== otp) {
            next({status:403,message:INCORECT_OTP})
            return
        }
        UserActivation.destroy({where:{userId:user.id}})
        await User.update(
            {isVerified:true},
            {where:{id:user.id}})
        let updatedUser = await User.findByPk(user.id)
        const jwtToken = generateToken({email:user.email, id:user.id})
        Responses.setSuccess(201,EMAIL_VERIFIED_SUCCESSFULLY, {jwtToken, data: {...updatedUser.dataValues, password:''}})
        Responses.send(res)
    } catch (error) {
        // console.log(error, '=======@@@@@@')
        next({message:error.message, statusCode:500})
    }
}

const verifyPhoneController = async (req, res, next) => {
    try {
        const {otp} = req.body
        const user = res.locals.user;

        const userActivaton = await UserActivation.findOne({where:{userId:user.id}})
        if(!userActivaton) return next({status:403, message:ACCOUNT_HAS_ALREADY_VERIFIED})
        if(userActivaton.otp !== otp) return next({status:403,message:INCORECT_OTP});

        UserActivation.destroy({where:{userId:user.id}})

        await Profile.update({isPhoneNumberVerified:true},{where:{UserId:user.id}})
        Responses.setSuccess(201,EMAIL_VERIFIED_SUCCESSFULLY, {data: {}})
        Responses.send(res)

    } catch (error) {
        next({message:constStrings.databaseError, statusCode:500})
    }
}

const verifyUserController = async (req, res, next) => {
    try {
        const {hashedSecret, email, id } = req.query

        const user = await getAuserWithPK(id);
        
        if(!user) {
            next({message:'User could not be found', statusCode:404})
        }
        const userActivationData = await UserActivation.findOne({where:{userId:user.id}})
        if(!userActivationData) {
            // Responses.setError(404, 'Account has been verified');
            // Responses.send(res)
            next({message:'Account has been verified', statusCode:401})
        }
        if(userActivationData?.hashedSecret === hashedSecret && email === user.email) {
            const updatedUser = await udpdateUser(email);
            UserActivation.destroy({where: {userId:id}})
            Responses.setSuccess(200, 'Email has been verified successfully');
            Responses.send(res);
        } else {
        next({message:'Unauthorized', statusCode:401})
        }
        
    } catch (error) {
        
        next({message:error.message, statusCode:401})
    }
}

const resendEmailVerificationOTP = async (req, res, next) => {
    try {
        const { host } = req.headers;
        const {email} = req.body

        const user = await User.findOne({where:{email}})

        if(!user || user.email !== email) {
            return next({statusCode:404, message: EMAIIL_CAN_NOT_BE_FOUND})
        }

        UserActivation.destroy({where:{userId:user.id}})

        const jwtToken = generateToken({email:user.email, id:user.id})

        const OTP = generateOTP(6)

        const activation = await  addOTPtoDB(OTP, user.id)

        const otp = activation.otp
        const userEmail = user.email
        const userId = user.id

        const emailData = {
            recipientEmail:userEmail,
            otp,
            userId,
            host,
            userFullName:`${user.firstName} ${user.lastName}`
        }
        
        const {msg, verifyEmail} = constStrings
        sendMail(emailData, verifyEmail);

        Responses.setSuccess(201,msg, {token:jwtToken});
        Responses.send(res)
    } catch (error) {
        console.log(error)
        next({message:error.message, statusCode:401})
    }
}

const registerPhoneNumberController = async (req, res, next) => {
    try {
        const { user } = res.locals
        const {phoneNumber} = req.body

        const otp = generateOTP(6)

        await User.update({phoneNumber}, {where:{id:user.id}})
        await addOTPtoDB(otp, user.id)

        sendSmsOtp({phoneNumber, OTP:otp}, next)
        Responses.setSuccess(201, PHONE_OTP_SENT)
        Responses.send(res)
    } catch (error) {
        // console.log(error)
        next({message:constStrings.databaseError, statusCode:500})
    }
}

const resendVerificationLinkController = async (req, res, next) => {
    try {
        let token
        const { host } = req.headers

        token = { targertMail } = req.params

        const userRes = findUserByEmail(targertMail)

        const {msg, verifyUser} = constStrings
        token = generateToken({email:userRes.email, id:userRes.id})

        sendMail(userRes.email, host, token, verifyUser)
        
        Responses.setSuccess(201,msg, {token});
        Responses.send(res)
    } catch (error) {
        next({message:constStrings.databaseError, statusCode:500})
    }  

}

const forgetPasswordController = async (req, res) => {
    try {
        const { host } = req.headers
        const { email } = req.body

        const userRes = await findUserByEmail(email)

        if(!userRes) {
            next({message:'User could not be found', statusCode:404})
        }
        const secret = process.env.SECRET + userRes.password
        
        const token = generateToken({email:userRes.email, id:userRes.id}, secret);
        const randomString = generateRandomString(60);

        const emailData = {
            recipientEmail:userRes.email,
            hashedSecret:token,
            userId:'',
            host,
            userFullName:'User'
        }

        const { forgetPassword, resetPasswordLinkSuccess} = constStrings

        sendMail(emailData, forgetPassword)

        Responses.setSuccess(200, resetPasswordLinkSuccess);
        Responses.send(res)
        
    } catch (error) {
        next({message:constStrings.databaseError, statusCode:500})
    }
}

const resetPasswordController = async (req, res, next) => {
    try {
        const {id, token} = req.params
        const userRes = await getAuserWithPK(id)
        if(!userRes) {
            next({message:'User could not be found', statusCode:404})
        }
        const secret = process.env.SECRET + userRes.password
        const payload = verifyToken(token, secret);
        if(id !== payload.id) {
            next({message:'Unauthorized', statusCode:401})
        }
        const newToken = generateToken({email:payload.email, id:userRes.id}, secret);
        Responses.setSuccess(200, {token:newToken, message: 'You can now redirect to reset password page'})
        Responses.send(res)
    } catch (error) {
        next({message:'There is error in redirect user to reset password page', statusCode:500})
    }
}

export {
    signupController,
    loginController,
    verifyUserController,
    resendVerificationLinkController,
    forgetPasswordController,
    resetPasswordController,
    verifyOTPController,
    registerPhoneNumberController,
    verifyPhoneController,
    resendEmailVerificationOTP
}