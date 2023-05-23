import Responses from "../utils/Responses"
import { createAServiceService } from "../services/serviceServices";
import { Service, Address, Charges, ServiceType, sequelize } from '../../dbase/models'
import { serviceSchema, updateServiceSchema } from "../utils/validations/serviceValidation";

import { SERVICE_EXIST_ALREADY, ADDRESS_ALREADY_CREATED,SERVICE_NOT_FOUND, BAD_REQUEST, constStrings } from '../constants'
import { findUserAddress } from "../services/user";
import { getNearestServiceSql } from "../utils/sqls/serviceSQL";
import { createAddress } from "../services/addressService";

const createServiceController = async (req, res, next) => {
    try {
        const {user} = res.locals
        const {workId, description,location,expertLevel,yearsOfExperience,video,serviceType,status,servicecharge,} = req.body
        const banners = req?.file?.originalname;

        const service = {workId, description,location,expertLevel,yearsOfExperience,serviceType,status,servicecharge,banners, userId:user.id}

        let { error, value} = serviceSchema.validate(service)

        if(error) {
           return next({status:403, message: error.message})
        }

        
        const locationObj = JSON.parse(location)
        const {longitude,latitude} = locationObj

        let userHaveTheAddress = [];

        if(typeof location !== 'number') {
            userHaveTheAddress = await findUserAddress(user.id)
        }      
                
        const serviceChargeObj = JSON.parse(servicecharge);
        const serviceTypeObj = JSON.parse(serviceType)
        
        const serviceObj = {
            workId,
            description,
            expertLevel,
            yearsOfExperience,
            status,
            video,
            userId:user.id,
            banners,
            location: typeof location == 'number' ? location : userHaveTheAddress.length > 0 ? userHaveTheAddress[0].id:null
        }

        const userHasCreatedTheService = await Service.findOne({
            where: {
                userId:user.id,
                workId
            }
        })

        if(userHasCreatedTheService) {
            next({status:403, message:SERVICE_EXIST_ALREADY});
            return
        }

        const newService = await Service.create(serviceObj) 
        
        let newAddress

        if(userHaveTheAddress?.length > 0) {
            Address.update({serviceId:newService.id}, {
                where: {userId:user.id}
            })
        }

        if (typeof location == 'number') {
            Address.update({serviceId:newService.id}, {
                where: {userId:user.id}
            })
        }
        
        if(typeof location !== 'number' && userHaveTheAddress?.length < 1) {
            newAddress = await createAddress({userId:user.id, serviceId:newService.id, ...locationObj })
            // Address.create({...locationObj, location: {type:'Point', coordinates:[longitude,latitude], crs: { type: 'name', properties: { name: 'EPSG:4326'} }}, userId:user.id, coordinate:`${longitude} ${latitude}`, serviceId:newService.id})

            Service.update({location:newAddress.id}, {
                where: {id:newService.id}
            })
        }

        await Charges.bulkCreate([...serviceChargeObj.map(charg => {
            return {
                ...charg, UserId:user.id, ServiceId:newService.id
            }
        })])

        await ServiceType.bulkCreate([...serviceTypeObj.map(type => {
            return {
                typeOfService:type, ServiceId:newService.id
            }
        })])
        
        const serviceResponse = await Service.findByPk(newService.id
            , {
            include: [
                {model: Address},
                {model: Charges},
                {model: ServiceType},
            ]
        }
        )
        Responses.setSuccess(200, 'you just created a Service', {serviceResponse});
        Responses.send(res)
    } catch (error) {
        next({message:error.message, statusCode:500}) 
    }
}

const getAllServicesController = (req, res) => {
    Responses.setSuccess(200, 'endpoint to get all Services')
    Responses.send(res)
}

const updateServiceController = async (req, res, next) => {
    try {
        
        const {user} = res.locals
        const {serviceId} = req.query
        const {description, expertLevel,yearsOfExperience, status} = req.body

        const serviceObj = {description, expertLevel,yearsOfExperience, status}

        const { err, value} = updateServiceSchema.validate(serviceObj)

        if(err) {
            return next({statusCode:403, message:err.message})
        }

        const service = await Service.findByPk(serviceId)

        if(!service) {
            return next({status:404, message:SERVICE_NOT_FOUND})
        }

        if(service.userId !== user.id) {
            return next({status:400, message:BAD_REQUEST})
        }

        await Service.update(
            {...serviceObj}, {where: {id:serviceId}}
        )

        const updatedService = await Service.findByPk(serviceId)

        Responses.setSuccess(200, '', updatedService)
        Responses.send(res)
    } catch (error) {
        next({message:error.message, statusCode:500})
    }
}

const deleteServiceController = (req, res) => {
    Responses.setSuccess(200, 'endpoint to delete a single Service')
    Responses.send(res)
}

const nearRestServiceController = async (req, res, next) => {
    try {
        const { long, lat, workId} = req.query;

        const location = sequelize.literal(`ST_GeomFromText('POINT(${long} ${lat})', 4326)`);

        // const nearestServices = await Service.findAll({
        //     where: {
        //         workId
        //     },
        //     include: {
        //         model: Address,
        //         where: {
        //             location:[[sequelize.fn('ST_Distance_Sphere', sequelize.literal('geolocation'), location),'distance']],
        //             // [[sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians("+lat+")) * cos(radians("+long+")) - radians(longitude)) + sin(radians("+lat+")) * sin(radians(latitude)))"),'distance']],
        //             order: 'distance', //sequelize.col('distance'),
        //             limit: 4
        //         }
        //     }
        // })
        
        const [results, metadata] = await sequelize.query(
            getNearestServiceSql(workId, lat, long)

            // `SELECT * FROM addresses WHERE ST_Within(ST_TRANSFORM(ST_SRID(location, 4326), 3857), ST_Buffer(
            //     ST_TRANSFORM(
            //     ST_PointFromText('POINT(${lat} ${long})', 4326)
            //     , 3857), 17000)) INNER JOIN services ON workId = ${workId};
            // `
            // "SELECT * FROM addresses"
            // "SELECT * FROM addresses WHERE ST_Within(location, ST_Buffer(ST_TRANSFORM(ST_GeomFromText('POINT("+lat+ " "+long+")'), 3857), 4.4))"
        )
        // const nearestLocation = await Address.findAll({
        //     where: {
        //         location: [[sequelize.fn('ST_Distance_Sphere', sequelize.literal('geolocation'), location),'distance']],
        //         // [[sequelize.fn('ST_Distance_Sphere', sequelize.literal('geolocation'), location),'distance']],
        //         order: 'distance', 
        //         limit: 4
        //     }
        // })
        Responses.setSuccess(200, '', results)
        Responses.send(res)
        
    } catch (error) {
        next({message:error.message, statusCode:500})
    }
}
export {
    createServiceController,
    getAllServicesController,
    updateServiceController,
    deleteServiceController,
    nearRestServiceController
}