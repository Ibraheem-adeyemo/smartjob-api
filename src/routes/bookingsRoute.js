import express from 'express'
import { 
   createBookingController
} from '../controllers/bookingController';
import { uploads } from '../utils/helpers'
import { isAuthenticated } from '../middlewares/authMiddleware'
import { canMakeBooking } from '../middlewares/bookingMiddleware';

const bookingRoute = express.Router()

bookingRoute.post('/bookings/createBooking', isAuthenticated, canMakeBooking, createBookingController)



export default bookingRoute;