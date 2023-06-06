import { createBookingSchema } from "../utils/validations/bookingValidation";
import { Service } from "../../dbase/models"

export const canMakeBooking = async (req, res, next) => {
    try {
        const { user } = res.locals;
        const {advancePayment, date, time, recipientName, recipientPhonenumber, bookedFor } = req.body;

        if(!bookedFor) {
            return next({statusCode:400, message: 'Invalid service ID'})
        }
        // const serviceBooking = await Service.
        const serviceBooking = await Service.findByPk(bookedFor);

        if(user.id == serviceBooking.userId) {
            return next({statusCode:409, message:"You can't order or book your own service" })
        }

        next()

        // const bookingObj = {advancePayment, date, time, recipientName, recipientPhonenumber, bookedFor}
        // const {error, value} = createBookingSchema.validate(bookingObj)


    } catch (error) {
        next({statusCode: 500, message: error.message})
    }
}