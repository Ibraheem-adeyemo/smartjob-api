import db from '../../dbase/models';

const {Job} = db;

const createAJobService = (job) => {
    console.log(job.toJson())
    //return Job.create(job)
}

const getAllJobsService = () => {
    return Job.find()
}

export {
    createAJobService,
    getAllJobsService
}