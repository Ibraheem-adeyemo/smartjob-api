import { findUserAddress } from './user';
import { Address } from '../../dbase/models'

export const createAddress = async (addObj, next) => {

    const {country, state, city, subUrb, long, lat, userId=null, serviceId=null, jobId=null} = addObj
    const addressObj = {
        country,
        state,
        city,
        subUrb,
        location: {type:'Point', coordinates:[long,lat], crs: { type: 'name', properties: { name: 'EPSG:4326'} }},
        location_m: {type:'Point', coordinates:[long,lat], crs: { type: 'name', properties: { name: 'EPSG:3857'} }},
        longitude:long,
        latitude:lat,
        coordinate:`${long} ${lat}`,
        userId, 
        serviceId, 
        jobId
    }

    const userAddress = await findUserAddress(userId)

    if(userAddress.length > 0) {
        return next({statusCode:403, message: ADDRESS_ALREADY_CREATED})
    }

    return await Address.create(addressObj)
}