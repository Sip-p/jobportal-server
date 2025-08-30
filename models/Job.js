import mongoose from 'mongoose'
const jobSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    location:{type:String,required:true},
    category:{type:String,required:true},
level:{type:String,required:true},
 salary:{type:Number,required:true},
 date:{type:Number,required:true},
 visible:{type:Boolean,default:true},
 companyId:{type:mongoose.Schema.Types.ObjectId,ref:'Company',required:true},
   noofApplicants:{type:Number,default:0},
})
const Job=mongoose.model('Job',jobSchema)
export default Job