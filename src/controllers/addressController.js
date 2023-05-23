import Responses from '../utils/Responses'
import {constStrings} from '../constants';
import { Address } from '../../dbase/models'
import { ADDRESS_CREATED_SUCCESSFULLY,
     ADDRESS_ALREADY_CREATED,
     ADDRESS_CAN_NOT_BE_FOUND,
     ADDRESS_UPDATED_SUCCESSFULLY
    } from '../constants'
import { findUserAddress } from '../services/user';
import { createAddress } from '../services/addressService';

export const createAddressController = async (req, res, next) => {
    try {
        const { user } = res.locals
        
        const addressRes = await createAddress({userId:user.id, ...req.body}, next)

        Responses.setSuccess(201, ADDRESS_CREATED_SUCCESSFULLY, {data:addressRes})
        Responses.send(res)
    } catch (error) {
        console.log(error)
        next({message:constStrings.databaseError, statusCode:500});
    }
}

export const getNearestAddressController = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};

export const updateAddressController = async (req, res, next) => {
    try {
        const { addressId } = req.query
        const { user } = res.locals
        const { country, state, city, subUrb, long, lat } = req.body
        const addressObj = {
            country,
            state,
            city,
            subUrb,
            location: {type:'Point', coordinates:[long,lat]},
            longitude:long,
            latitude:lat,
            userId:user.id,
            coordinate:`${long} ${lat}`
        }

        const dbAddress = await Address.findByPk(addressId)

        if(dbAddress.userId !== user.id) {
            return next({statusCode:404, message: ADDRESS_CAN_NOT_BE_FOUND })
        }

        await Address.update(addressObj, {
            where: {id:addressId}
        })
        const updatedAddress = await Address.findByPk(addressId)

        Responses.setSuccess(201, ADDRESS_UPDATED_SUCCESSFULLY, updatedAddress)
        Responses.send(res)
    } catch (error) {
        next({message:error.message, statusCode:500})
    }
}