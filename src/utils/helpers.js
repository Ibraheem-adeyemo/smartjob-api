import multer from 'multer';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CourierClient } from '@trycourier/courier'
import { constStrings } from '../constants';
import fast2sms from 'fast-two-sms'

require('dotenv').config();

const senderEmail = process.env.EMAIL;
const secret = process.env.SECRET;
const passwd = process.env.EMAIL_PASSWORD
// const eventId = process.env.COURIER_EVENT_ID
// const recipientId = process.env.COURIER_RECIPIENT_ID
const authToken = process.env.COURIER_AUTH_TOKEN
// const mailTrapUser = process.env.MAIL_TRAP_USER
// const mailTrapPassword = process.env.MAIL_TRAP_PASS
const hostUrl = process.env.HOST_URL
const nodeMailerHost = process.env.NODE_MAILER_HOST
const smsAPIUrl = process.env.SMS_API_URL
const rapidAPIKey=process.env.RAPID_API_KEY
const rapidAPIHost=process.env.RAPID_API_HOST

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
export const uploads = multer({ storage: storage })

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

export const comparePassword = async (passwd, hash) => {
    return await bcrypt.compare(passwd, hash)
}

export const generateToken = (payload, jwtSecret=secret) => {
    console.log(payload)
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: '12hr'
    })
    return token;
}

export const verifyToken = (token, jwtSecret=secret) => {
    const decoded = jwt.verify(token, jwtSecret)
    return decoded
}

export const sendEmail = async (transport, emailData) => {
    
  try {
    const emailRes = await transport.sendMail({
        from: `"Smartract "<${senderEmail}>`, // sender address
        to: `${emailData.recipientEmail}`,
        subject: `${emailData.subject}`, // Subject line
        html: `${emailData.body}`
      });
    
  } catch (error) {
    console.log(JSON.parse(JSON.stringify(error)));
  }
}

export const generateOTP = (num) => {
    const digits = "0123456789"
    let OTP = ""
    for(let i=0; i<num; i++) {
        OTP += digits[Math.floor(Math.random() * 10)]
    }
    return OTP;
}

export const sendOTP = async ({message, phoneNum}, next) => {
    try {
        const res = await fast2sms.sendMessage({
            authorization: FAST2SMS,
            message,
            numbers: [phoneNum],
        })
    } catch(err) {
        next(err)
    }
}

const axios = require("axios");

export const sendSmsOtp = ({phoneNumber, OTP}, next) => {
    const options = {
        method: 'POST',
        url: smsAPIUrl,
        params: {phoneNumber, verifyCode: OTP},
        headers: {
          'X-RapidAPI-Key': rapidAPIKey,
          'X-RapidAPI-Host': rapidAPIHost
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
          next(error)
      });
}


export const transporter = () => nodemailer.createTransport({
  host: nodeMailerHost,
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: senderEmail,
    pass: passwd
  },
//   tls: {
//     rejectUnauthorized: false
//   }
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: mailTrapUser,
//     pass: mailTrapPassword
//   }
});

export const composeVerificationMail = (emailData, mailType) => {
    
    const { recipientEmail, otp='', userFullName ='' } = emailData
    
    switch (mailType) {
        case constStrings.verifyEmail:
            return {
                recipientEmail: `${recipientEmail}`,
                subject: 'Email verification',
                body: `<div>
                  Hi ${userFullName} Thank you for Creating an account on SMARTRACT. <br/> continue your registration by copy and paste the OTP below.<br/>
                  your OTP is ${otp}
                  </div>`
              };
        case constStrings.forgetPassword:
            return {
                recipientEmail: `${recipientEmail}`,
                subject: 'Password reset OTP',
                body: `<div>
                Hi ${userFullName} Kindly copy and paste the OTP below to reset your password.<br /><br/>
                your OTP is ${otp}
                </div>
                `
            };
        case constStrings.bookingRequest:
            return {
                recipientEmail: recipientEmail,
                subject: 'Service request',
                body: `<div> 
                    ${emailData.message}
                </div>`
            }
        default:
            break;
    }
  }

  const courier = CourierClient({ authorizationToken: authToken });
//   courier.send({
//    eventId, // your Notification ID
//    recipientId, // usually your system's User ID
//    profile: {
//      email: "<EMAIL_ADDRESS>"
//    },
//    data: {} ,// optional variables for merging into templates 
//     }).then((resp) => {
//      console.log('Email sent', resp)
//    })
//    .catch((error) => {
//      console.error(error)
//    });

export const courierMailSender = (emailData) => courier.send({
    message: {
        to: [
            {
                user_id: "<USER_ID>", // usually your system's User ID associated to a Courier profile
                email: "test@email.com",
                data: {
                  name: "some user's name",
                },
              },
        ],
        tokk: {
            data: {
                name: 'emailData?.name'
            },
            email: emailData.recipientEmail
        },
        content: {
            ...emailData.content
        },
        routing: {
            method: "single",
            channels: ["email"],
        }
    }
})

export const sendMail = (emailData, mailType) => {
    
    const mailContent = composeVerificationMail(emailData, mailType )
    sendEmail(transporter(), mailContent)
}
