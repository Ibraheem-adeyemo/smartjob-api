import { User, UserActivation, Address } from '../../dbase/models'
import { ErrorResponse } from '../utils/ErrorResponse'
import { generateRandomString } from '../utils/function';

export const createUser = async (userObj) => {
    try { 
    const response = await User.create(userObj);

    const res = await  UserActivation.create({hashedSecret: generateRandomString(60), userId:response.id, expiredOn:Date.now()+21600000})
   const userData = {
                id:response.id, 
                firstName:response.firstName, 
                lastName:response.lastName, 
                email:response.email, 
                phoneNumber:response.phoneNumber,
                isVerified:response.isVerified,
                createdAt: response.createdAt,
                updatedAt: response.updatedAt,
                fullName: `${response.firstName} ${response.lastName}`
            }
           
    const userActivationRes = {
                        hashedSecret: res.hashedSecret,
                        expiredOn: res.expiredOn,
                        createdAt: res.createdAt,
                        updatedAt: res.updatedAt
                    }
                    
    return {
        userData, userActivationRes
    }

      
    // const response = await User.create(userObj)
    
    // const userResponse = {
    //     id:response.id,
    //     firstName: response.firstName,
    //     lastName: response.lastName,
    //     userEmail:response.email
    // }
    // return {status: 'Success', userResponse}
      
    } catch (error) {
        
        throw new Error('Error from database')
    }
}

export const login = (loginObj) => {
    const { email } = loginObj
    return User.findOne({ where: { email }})
}

export const getAuserWithPK = (id) => {
    return User.findByPk(id)
}

export const findUserByEmail = (email) => {
    return User.findOne({ where:{email}})
}

export const addOTPtoDB = (otp, userId, expiredOn=Date.now()+21600000) => {
    return UserActivation.create({otp, userId, expiredOn});
}
export const udpdateUser = async (email) => {
    return User.update(
        {isVerified: true},
        {where: {email}}
    )
}
export const findUserAddress = async (userId) => {
    return Address.findAll({
        where: {userId}
    })
}
