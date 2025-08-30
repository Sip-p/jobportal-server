import User from "../models/User.js"
import {v2 as cloudinary} from "cloudinary"
import JobApplication from '../models/JobApplication.js'
 import { getAuth } from "@clerk/express";
import Job from "../models/Job.js";
//Save user data when they login/sign-up
export const saveUserData = async (req, res) => {
  try {
    const { clerkId, name, email,image,resume } = req.body;
// console.log("The user data received at backend:", req.body)
    if (!clerkId || !email) {
      return res.status(400).json({ success: false, message: "Missing user data" });
    }

    // Check if user already exists
    let user = await User.findOne({ email: email });
    if (!user) {
      // Create new user
      user = await User.create({
        
        clerkId: clerkId,
        name: name,
        email,image,resume
         
      });
      // console.log("the created user is ",user)
    }

    res.json({ success: true, user });
  } catch (error) {
    // console.error("Save user error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};




// Get user data
export const getUserData = async (req, res) => {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "User not logged in" });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    // console.error("Get user error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const applyForJob=async(req,res)=>{
  const clerkId=req.auth().userId 
 const {jobId}=req.body
 console.log("The job id received is",jobId)
  console.log("The user id received is",clerkId)

  
 try {
    const isAlreadyApplied=await JobApplication.findOne({jobId,clerkId})
    if(isAlreadyApplied){
        return res.json({success:false,message:'Already Applied'})
    }
    const jobData=await Job.findById(jobId)
    if(!jobData){
        return res.json({success:false,message:'job not found'})

    }
    await JobApplication.create({
        companyId:jobData.companyId,
        clerkId,jobId,date:Date.now()
    })
    res.json({success:true,message:'Applied Successfully'})
 } catch (error) {
    res.json({success:false,message:error.message})
 }
}

//Get user applied applications
export const getUserJobApplications=async(req,res)=>{
    const clerkId=req.auth().userId
try {
    const applications=await JobApplication.find({clerkId}).populate('companyId','name email image').populate('jobId','title description location category level salary').exec()
    if(!applications){
        return res.json({success:false,message:'User has not applied'})
    }
    else{
        return res.json({success:true,applications})
    }
} catch (error) {
    res.json({success:false,message:error.meessage})
}
}

 

 

export const updateUserResume = async (req, res) => {
  try {
     

    const { userId } = req.auth(); // Clerk ID
 

    const resumeFile = req.file;
     

    const userData = await User.findOne({ clerkId: userId }); // 👈 FIXED
    

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (resumeFile) {
    
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      

      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();
     return res.json({
      success: true,
      message: "Resume updated successfully",
      resumeUrl: userData.resume,
    });
  } catch (error) { 
    res.status(500).json({ success: false, message: error.message });
  }
};


