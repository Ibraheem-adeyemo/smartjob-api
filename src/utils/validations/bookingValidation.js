import Joi from "@hapi/joi";

export const createBookingSchema = Joi.object().keys({
    advancePayment: Joi.number().integer().required(),
    date:Joi.date().required(), 
    time: Joi.time().required(), 
    recipientName:Joi.string().required(), 
    recipientPhonenumber: Joi.string.required(), 
    bookedFor: Joi.number().integer().required()
})