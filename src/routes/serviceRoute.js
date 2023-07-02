import express from 'express'
import { 
    createServiceController,
    getAllServicesController,
    updateServiceController,
    deleteServiceController,
    nearRestServiceController,
    editServiceController
} from '../controllers/serviceController';
import { uploads } from '../utils/helpers'
import { isAuthenticated } from '../middlewares/authMiddleware'

const serviceRoute = express.Router()

serviceRoute.post('/services/createAService', isAuthenticated, uploads.array('banners',4), createServiceController)
serviceRoute.get('/services/allServices', isAuthenticated, getAllServicesController)
serviceRoute.get('/services/services/:id', createServiceController)
serviceRoute.put('/services/updateService', isAuthenticated, uploads.single('banners'), updateServiceController)
serviceRoute.delete('/services/deleteAService/:id', deleteServiceController)
serviceRoute.get('/services/nearest-services', nearRestServiceController )
serviceRoute.patch('/services/update-service', isAuthenticated, editServiceController)


export default serviceRoute;