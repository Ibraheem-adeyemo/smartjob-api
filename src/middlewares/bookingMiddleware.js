import { Service, Booking, Work } from "../../dbase/models"


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
                bookedFor,
                isActive:true
            }
        })

        if(bookedAlredy) {
            return next({statusCode:400, message: "You have alredy booked this service. The service need to be completed or canceled before you can re order it"})
        }

        next()

        // const bookingObj = {advancePayment, date, time, recipientName, recipientPhonenumber, bookedFor}
        // const {error, value} = createBookingSchema.validate(bookingObj)


    } catch (error) {
        next({statusCode: 500, message: error.message})
    }
}

export const canPickBookinRequest = async (req, res, next) => {
    try {
        const { user } = res.locals;
        const { bookingId } = req.body;

        if(!bookingId) {
            return next({statusCode:400, message:'Booking is not selected'})
        }

        const booking = await Booking.findByPk(bookingId, {
            include: [
                {model :Service,
                include : [
                    {model: Work}
                ]},
                // {model:Work}
            ]
        });
        
        if(!booking) {
            return next({statusCode:404, message: 'Booking can not be found'})
        }

        if(booking.bookedBy === user.id) {
            return next({statusCode: 409, message: 'You can\'t pick the service booked by yourself'})
        }

        // const serviceBooked = await Booking.findByPk(bookingId, {
        //     include: [
        //         {model:Service}
        //     ]
        // })
        const {Service: {userId}} = booking

        if(userId !== user.id) {
            return next({statusCode:403, message:'You can\'t pick service request meant for another user' })
        }

        res.locals.booking = booking;

        next()
    } catch (error) {
        next({statusCode: 500, message: error.message})
    }
}