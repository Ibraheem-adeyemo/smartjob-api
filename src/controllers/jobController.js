import Responses from "../utils/Responses"
import { createAJobService, getAllJobsService } from "../services/jobServices";

const createJobController = (req, res) => {
    let reqBody = req.body
    reqBody.images = req.file
    // const reqImg = req
    
    console.log(reqBody, req.file)
    // createAJobService(reqBody);
    Responses.setSuccess(200, 'you just created a job');
    Responses.send(res)
}

const getAllJobsController = async (req, res) => {
    try {
        const allJobs = await getAllJobsService()
        console.log(allJobs)
        Responses.setSuccess(200, 'endpoint to get all jobs');
        Responses.send(res);
    } catch (error) {
        console.log(error);
        Responses.setError(500, 'error from the data base');
        Responses.send(res);
    }
}

const editJobController = (req, res) => {
    Responses.setSuccess(200, 'endpoint to edit a single job')
    Responses.send(res)
}
const deleteJobController = (req, res) => {
    Responses.setSuccess(200, 'endpoint to delete a single job')
    Responses.send(res)
}

const getASingleJobController = (req,res) => {
    Responses.setSuccess(200, 'endpoint to delete a single job')
    Responses.send(res)
}
export {
    createJobController,
    getAllJobsController,
    editJobController,
    deleteJobController,
    getASingleJobController
}