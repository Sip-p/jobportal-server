// import express from 'express'
// import { applyForJob, getUserData, getUserJobApplications, updateUserResume  } from '../controller/userController.js'
// import multer from 'multer'
// // import { requireAuth } from "@clerk/express"
//  import { requireAuth } from "@clerk/express";
 
// const router=express.Router()
// // Save user data (called by frontend after login)
// // router.post("/save", saveUserData);

// // Get user data (requires login)
// router.get("/user" , getUserData);
// const upload=multer({dest:'uploads/'})
 
// // get user data
// router.get('/user',requireAuth(),getUserData)
// // s
// //Apply for job
// router.post('/apply',applyForJob)
// //get applied jobs data
// router.get('/applications',getUserJobApplications)
// //update your profile
// router.post('/update-resume',upload.single('resume'),updateUserResume)
// export default  router;\




import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume,saveUserData } from '../controller/userController.js'
import multer from 'multer'
const upload=multer({dest:'uploads/'})
const router=express.Router()
import { requireAuth } from '@clerk/express'
//save user data
router.post('/save',saveUserData)
// get user data
router.get('/user',getUserData)

//Apply for job
router.post('/apply',applyForJob)
//get applied jobs data
router.get('/applications',getUserJobApplications)
//update your profile
// router.post('/update-resume',upload.single('resume'),updateUserResume)
router.post(
  "/update-resume",             // ✅ ensures req.auth is available
  upload.single("resume"),  // ✅ parses file
  updateUserResume
)
export default  router;