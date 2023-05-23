import express from 'express'
import { getAllWorkController, getWorkByIdController, searchWorkController } from '../controllers/workController'
import { isAuthenticated } from '../middlewares/authMiddleware'

const workRoute = express.Router()


// get all work route
workRoute.get('/works/allWorks', isAuthenticated, getAllWorkController)
workRoute.get('/works/:id', isAuthenticated, getWorkByIdController)
workRoute.get('/works/search/:name', searchWorkController )

export default workRoute