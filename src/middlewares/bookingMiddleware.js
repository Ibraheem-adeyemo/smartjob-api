import { createBookingSchema } from "../utils/validations/bookingValidation";
import { Service, Booking } from "../../dbase/models"

export const canMakeBooking = async (req, res, next) => {
    try {
        const { user } = res.locals;
        const { bookedFor } = req.body;

        if(!bookedFor) {
            return next({statusCode:400, message: 'Invalid service ID'})
        }
        // const serviceBooking = await Service.
        const service = await Service.findByPk(bookedFor);

        if(!service) {
            return next({statusCode:404, message:"Service does not exist" })
        }

        if(user.id == service.userId) {
            return next({statusCode:409, message:"You can't order or book your own service" })
        }

        const bookedAlredy = await Booking.findOne({
            where: {
                bookedBy:user.id,
                bookedFor
            }
        })

        next()

        // const bookingObj = {advancePayment, date, time, recipientName, recipientPhonenumber, bookedFor}
        // const {error, value} = createBookingSchema.validate(bookingObj)


    } catch (error) {
        next({statusCode: 500, message: error.message})
    }
}