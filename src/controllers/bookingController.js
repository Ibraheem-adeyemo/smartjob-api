import Responses from "../utils/Responses"
import { createAJobService, getAllJobsService } from "../services/jobServices";

const createBookingController = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

const getAllBookingController = async (req, res) => {
    try {
        
    } catch (error) {
       
    }
}

const editBookingController = (req, res) => {
    Responses.setSuccess(200, 'endpoint to edit a single booking')
    Responses.send(res)
}
const deleteBookingController = (req, res) => {
    Responses.setSuccess(200, 'endpoint to delete a single booking')
    Responses.send(res)
}

const getASingleBookingController = (req,res) => {
    Responses.setSuccess(200, 'endpoint to delete a single job')
    Responses.send(res)
}
export {
    createBookingController,
    getAllBookingController,
    editBookingController,
    deleteBookingController,
    getASingleBookingController
}