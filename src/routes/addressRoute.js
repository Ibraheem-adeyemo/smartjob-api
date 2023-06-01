import express from 'express'
import { createAddressController,
     getNearestAddressController,
     updateAddressController } from '../controllers/addressController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const addressRoute = express.Router()

addressRoute.post('/addresses/create-address', isAuthenticated, createAddressController)
addressRoute.get('/addresses/nearest-services', isAuthenticated, getNearestAddressController)
addressRoute.put('/addresses/update-address', isAuthenticated, updateAddressController)

export default addressRoute;