const Jobs = require('../models/jobModel');
const User =require('../models/userModel')
const bcrypt = require('bcrypt');
async function createJobs(email, jobName,jobimgUrl,jobType,timestamp) {
   // const user = await User.findOne({ email });
    if(!jobName){
        throw new Error('PostName is empty');
    }
    else{
        const job = new Jobs({
            jobName,
            email,
            jobimgUrl,
            jobType,
            timestamp
          });
          await job.save();
          return job;
    }
}
async function getallJobs() {
    const jobs = await Jobs.find({}, "jobName email jobimgUrl jobType timestamp");
    return jobs;
 }

 async function deleteJob(_id) {
    const result = await Jobs.deleteOne({ _id });
    return result;
 }

 async function editJob(_id,jobName,jobimgUrl,jobType) {

    const job = await Jobs.findOne({ _id });
    if(job){
      if(jobName)
      job.jobName=jobName;
      if(jobimgUrl)
      job.jobimgUrl=jobimgUrl;
      if(jobType)
      job.jobType=jobType;
      await job.save();
    }
    return job;
 }
 



module.exports = { createJobs ,getallJobs,deleteJob,editJob};


