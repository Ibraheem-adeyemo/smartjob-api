import express from 'express'
import { 
    createServiceController,
    getAllServicesController,
    updateServiceController,
    deleteServiceController,
    nearRestServiceController
} from '../controllers/serviceController';
import { uploads } from '../utils/helpers'
import { isAuthenticated } from '../middlewares/authMiddleware'

const serviceRoute = express.Router()

serviceRoute.post('/services/createAService', isAuthenticated, uploads.single('banners'), createServiceController)
serviceRoute.get('/services/allJServices', getAllServicesController)
serviceRoute.get('/services/aService/:id', createServiceController)
serviceRoute.put('/services/updateService', isAuthenticated, uploads.single('banners'), updateServiceController)
serviceRoute.delete('/services/deleteAService/:id', deleteServiceController)
serviceRoute.get('/services/nearest-services', nearRestServiceController )


export default serviceRoute;