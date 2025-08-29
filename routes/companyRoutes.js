import express from 'express'
import { registerCompany,loginCompany, getCompanyData, postJob, getCompanyJobApplicants, getCompanyPostedJobs, ChangeJobApplicationStatus, changeVisibility } from '../controller/companyController.js'
const router=express.Router()
import multer from 'multer'
import { protectCompany } from '../middleware/authMiddleware.js'
const upload=multer({dest:'uploads/'})

//Register a company
router.post('/register',upload.single("image"),registerCompany)

//Company Login
router.post('/login',loginCompany)

//get company data
router.get('/company',protectCompany,getCompanyData)

//Post a job
router.post('/post-job',protectCompany,postJob)

//Get Applicants data of company
router.get('/applicants',protectCompany,getCompanyJobApplicants)

//get company job list
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

//change application status
router.post('/change-status',protectCompany,ChangeJobApplicationStatus)

//change application visibility
router.post('/change-visibility',protectCompany,changeVisibility)

export default router;