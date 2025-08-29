import job from '../models/Job.js'

//get all jobs
export const getJobs=async(req,res)=>{
try {
    const jobs=await job.find({visible:true}).populate({path:'companyId',select:'-password'})
 
    res.json({success:true,jobs})
} catch (error) {
    res.json({success:false,message:error.message})
}
}

//get a single job by id
export const getJobById=async(req,res)=>{
try {
    const {id}=req.params
    const JobbyId=await job.findById(id).populate({
        path:'companyId',select:'-password'
    })
   
    if(!JobbyId){
        return res.json({success:false,message:'job not found'})
        
    }
    res.json({success:true,JobbyId})
} catch (error) {
    res.json({success:false,message:error.message})
}
}
