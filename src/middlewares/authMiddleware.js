import { User } from '../../dbase/models'
import { verifyToken } from '../utils/helpers'
import Responses from '../utils/Responses';

import { PHONE_ALREADY_EXISTS_ERR,
    AUTH_HEADER_MISSING_ERR, 
    AUTH_TOKEN_MISSING_ERR,
    USER_NOT_FOUND_ERR,
    ACCOUNT_HAS_NOT_BEEN_VERIFIED } from '../constants'

export const isUserExist = async (req, res, next) => {
    const {email } = req.body
    const user = await User.findOne({where:{email}})
    
    if (!user) {
        next()
    } else {
        Responses.setError(302, 'Kindly login as this email is registered to an account or use another email to create account')
        Responses.send(res)
    }
}

export const isLoggedIn = async (req, res, next) => {
    try {
        const { authorization } = req.headers
    
        const payload = verifyToken(authorization.split(' ')[1])

        if(payload.email) {
            const userRes = await User.findByPK(payload.id);            
            if(payload.email === userRes.email) {
                req.userObj = userRes

                next()
            } else {

            }
        }
    } catch (error) {
        Responses.setError(401, 'Token has expired or invalid')
        Responses.send(res)
    }
}

export const isUserVerified = async (req, res, next) => {
    try {
        const { authorization } = req.headers
    
        const payload = verifyToken(authorization.split(' ')[1])

    } catch (error) {
       console.log(error) 
    }
}

export const isAuthenticated = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if(!authorization) {
            next({status:403, message:AUTH_HEADER_MISSING_ERR});
            return
        }

        const token = authorization.split(' ')[1]     
        if(!token) {
            next({status:403, message:AUTH_TOKEN_MISSING_ERR})
            return
        }

        const payload = verifyToken(token);

        if(!payload) {
            next({status:403, message:JWT_DECODE_ERR});
            return
        }

        const user = await User.findByPk(payload.id);

        
        if(!user) {
            next({status:404, message:USER_NOT_FOUND_ERR})
            return
        }          
        res.locals.user = user;
        next()
        return user
    } catch (error) {
        next(error)
    }
}

export const isUserVerifiedAndAuthenticated = async (req, res, next) => {
    try {
        
        const user = await isAuthenticated(req, res, next)
        if(!user.isVerified) {
            return next({statusCode:400, message:ACCOUNT_HAS_NOT_BEEN_VERIFIED})
        }
        res.locals.user = user;
        next()
    } catch (error) {
        next(error)
    }
}

export const isEmailVerified = async (req, res, next) => {
    try {
        const {email } = req.body
        const user = await User.findOne({where:{email}})

        if(!user) {
            return next({statusCode:400, message:USER_NOT_FOUND_ERR})
        }
        
        if(!user.isVerified) {
            return next({statusCode:400, message:ACCOUNT_HAS_NOT_BEEN_VERIFIED})
        }
        res.locals.user = user;
        next()
    } catch (error) {
        next(error)
    }
}

export const isPhoneNumberAlreadyExist = async (req, res, next) => {
    try {
        const {phoneNumber } = req.body
        if(!phoneNumber) {
            return next({statusCode:403, message:'Please provide a valid phone number'})
        }
        const user = await User.findOne({where:{phoneNumber}})
        if(user) return next({status:403, message:PHONE_ALREADY_EXISTS_ERR})
        
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}