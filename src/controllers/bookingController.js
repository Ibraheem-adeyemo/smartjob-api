import Responses from "../utils/Responses"
import { createAJobService, getAllJobsService } from "../services/jobServices";
import { Service, Booking, User, Work, Notification } from "../../dbase/models"
import { createBookingSchema } from "../utils/validations/bookingValidation";
import { sendMail } from "../utils/helpers";
import { constStrings } from "../constants";

const {bookingRequest} = constStrings

const createBookingController = async (req, res, next) => {
    try {
        const {user} = res.locals
        const {advancePayment, date, time, recipientName, recipientPhonenumber, bookedFor } = req.body;

        const bookingObj = {advancePayment, date, time, recipientName, recipientPhonenumber, bookedFor}
        const {error, value} = createBookingSchema.validate(bookingObj)

        if(error) {
            return next({statusCode: 400, message:error.message})
        }

        const response = await Booking.create({...bookingObj, bookedBy: user.id});

        
        const serviceBooked = await Service.findByPk(bookedFor, {
            include: [
                {model:User},
                {model: Work}
            ]
        })
        
        const {User:{firstName, lastName, email, username, id : ownerId}, Work:{name: workName, } } = serviceBooked
        
        const emailData = {
            recipientEmail:email,
            message: `Dear ${username ? username : firstName+ ' ' +lastName}, ${user.firstName} ${user.lastName} has just requested for your ${workName} service. Kindly log on to your account on mobile app to pick the request so that he can book the service. Please note that you have 20 minutes to do this.`,
            // userId,
            // host,
            // userFullName:name
        }
        
        await Notification.create(
            {
                message:`${user.firstName} ${user.lastName} requested for you ${workName} service.`,
                meantFor:'Bookings',
                meantForId: response.id,
                from: user.id,
                ownerId,
                notificationType:'general'
            })

        sendMail(emailData, bookingRequest)

        Responses.setSuccess(201,'You have successfully requested for this service', response);
        Responses.send(res)

    } catch (error) {
        next({message:error && error.message ? error.message :constStrings.databaseError, statusCode:500})
    }
}

const getAllBookingController = async (req, res) => {
    try {
        
    } catch (error) {
       
    }
}

const payForBookingController = async (req, res, next) => {
    try {
        const { user } = req.locals;
        const { bookingId } = req.body;

        const booking = await Booking.findByPk(bookingId)
        if(!booking) {
            return next({statusCode: 404, message: 'This booking can not be found'})
        }

        if(user.id !== booking.bookedBy) {
            return next({statusCode:403, message: 'You are allowed to pay for this booking'})
        }

        if(!booking.isAvailable) {
            return next({statusCode:403, message: 'The service provider has not responded wheather he/she is available to render the service or not'})
        }

        if(!booking.isActive) {
            return next({statusCode:403, message: 'This booking is no longer active'})
        }

        if(!booking.isCompleted) {
            return next({statusCode:403, message: 'This booking\'s service has been provided and completed successfully'})
        }

        
        Responses.setSuccess(200, 'endpoint to edit a single booking')
        Responses.send(res)
    } catch (error) {
        
    }
}
const deleteBookingController = (req, res) => {
    Responses.setSuccess(200, 'endpoint to delete a single booking')
    Responses.send(res)
}

const getASingleBookingController = (req,res) => {
    Responses.setSuccess(200, 'endpoint to delete a single job')
    Responses.send(res)
}

const pickBookingRequestController = async (req, res, next) => {
    try {
        const { bookingId } = req.body;
        const { user, booking} = res.locals;

        await Booking.update({isAvailable:true}, {
            where: {id:bookingId}
        })

        const {bookedBy, Service : { Work:{name: workName, }} } = booking

        await Notification.create(
            {
                message:`${user.firstName} ${user.lastName} who provide  ${workName} service has requested you to make advance payment for him to start engage on the service.`,
                meantFor:'Bookings',
                meantForId: bookingId,
                from: user.id,
                ownerId:bookedBy,
                notificationType:'general'
            })

        Responses.setSuccess(204,'You have successfully picked the request and the user will now be able to make the advance payment');
        Responses.send(res) 
    } catch (error) {
        next({message:error && error.message ? error.message :constStrings.databaseError, statusCode:500})
    }
}
export {
    createBookingController,
    getAllBookingController,
    payForBookingController,
    deleteBookingController,
    getASingleBookingController,
    pickBookingRequestController
}