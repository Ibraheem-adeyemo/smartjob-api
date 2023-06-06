import express from 'express'
import { 
   createBookingController
} from '../controllers/bookingController';
import { uploads } from '../utils/helpers'
import { isAuthenticated } from '../middlewares/authMiddleware'

const bookingRoute = express.Router()

bookingRoute.post('/bookings/createBooking', isAuthenticated, createBookingController)



export default bookingRoute;