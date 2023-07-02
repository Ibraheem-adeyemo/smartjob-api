import express from 'express'
import { 
   createBookingController,
   pickBookingRequestController,
   payForBookingController
} from '../controllers/bookingController';
import { uploads } from '../utils/helpers'
import { isAuthenticated } from '../middlewares/authMiddleware'
import { canMakeBooking, canPickBookinRequest } from '../middlewares/bookingMiddleware';

const bookingRoute = express.Router()

bookingRoute.post('/bookings/createBooking', isAuthenticated, canMakeBooking, createBookingController);
bookingRoute.post('/bookings/payForBooking', isAuthenticated, payForBookingController);
bookingRoute.patch('/bookings/pickBookingRequest', isAuthenticated, canPickBookinRequest, pickBookingRequestController);



export default bookingRoute;