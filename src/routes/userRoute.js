import express from 'express'
import { signupController, 
        loginController, 
        verifyUserController, 
        resendVerificationLinkController,
        forgetPasswordController,
        resetPasswordController,
        verifyOTPController,
        registerPhoneNumberController,
        verifyPhoneController,
        resendEmailVerificationOTP,
        resetPasswordOTP
     } from '../controllers/userController';
import { isUserExist, isAuthenticated, isPhoneNumberAlreadyExist, isEmailVerified } from '../middlewares/authMiddleware';

const userRoute = express.Router()

userRoute.post('/users/createAccount', isUserExist, signupController)
userRoute.post('/users/login', isEmailVerified, loginController)
userRoute.post('/users/forgetPassword', forgetPasswordController)
userRoute.post('/users/resetPasswordOTP', isEmailVerified, resetPasswordOTP)
userRoute.post('/users/resetPassword', isAuthenticated, resetPasswordController)
userRoute.post('/users/resendEmailVerificationLink', resendVerificationLinkController)
userRoute.get('/users/verifyUser', verifyUserController)
userRoute.post('/users/verifyEmailOtp', isAuthenticated, verifyOTPController)
userRoute.post('/users/registerPhoneNumber', isAuthenticated, isPhoneNumberAlreadyExist, registerPhoneNumberController)
userRoute.post('/users/verifyPhone', isAuthenticated, verifyPhoneController)
userRoute.post('/users/resendEmailVerificationOTP', resendEmailVerificationOTP )

export default userRoute;