import express from 'express'
import { getJobById, getJobs } from '../controller/jobController.js';

const router=express.Router()

//route to get all job data
router.get('/',getJobs)

//route to get single job data by id
router.get('/:id',getJobById)
export default router;