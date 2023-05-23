import { Work } from '../../dbase/models'
import { constStrings } from "../constants";
import Responses from '../utils/Responses';
import { Op } from 'sequelize';

import { GET_ALL_WORKS_SUCCESSFULLY, GET_WORK_SUCCESSFULLY } from '../constants'

export const getAllWorkController = async (req, res, next) => {
    try {
        const allWorks = await Work.findAll()

        Responses.setSuccess(201, GET_ALL_WORKS_SUCCESSFULLY, {data:allWorks})
        Responses.send(res)
    } catch (error) {
        next({message:constStrings.databaseError, statusCode:500})
    }
}

export const getWorkByIdController = async (req, res, next) => {
    try {
        const id = req.params.id
        const work = await Work.findByPk(id)

        Responses.setSuccess(201, GET_WORK_SUCCESSFULLY, {data:work})
        Responses.send(res)
    } catch (error) {
        next({message:constStrings.databaseError, statusCode:500})
    }
}

export const searchWorkController = async (req, res, next) => {
    try {
        const {name} = req.params

        const searchedWork = await Work.findAll({where: {
            name : {
                [Op.substring]: name,
            }            
        }})

        Responses.setSuccess(201, GET_WORK_SUCCESSFULLY, {data:searchedWork})
        Responses.send(res)
    } catch (error) {
        next({message:constStrings.databaseError, statusCode:500})
    }
}