const mongoose =  require('mongoose');

var jobSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    jobName: {
    type: String,
    required: true,
    },
    jobimgUrl: {
      type: String,
      },
      jobType: {
        type: String,
        },
    timestamp: { type: Date, default: Date.now }
});
const Jobs = mongoose.model('Jobs', jobSchema);

module.exports=Jobs;
