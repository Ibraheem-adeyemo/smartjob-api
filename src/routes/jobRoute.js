import express from 'express'
import { 
    createJobController,
    getAllJobsController,
    editJobController,
    deleteJobController,
    getASingleJobController
} from '../controllers/jobController';
import { uploads } from '../utils/helpers'

const jobRoute = express.Router()

jobRoute.post('/createAJob', uploads.single('imag'), createJobController)
jobRoute.get('/getAllJobs', getAllJobsController)
jobRoute.get('/getAllJobs/:searchTerm', getAllJobsController)
jobRoute.get('/job/id', getASingleJobController)
jobRoute.put('/editJob', editJobController)
jobRoute.delete('/deleteJob/:id', deleteJobController)

export default jobRoute;