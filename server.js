import dotenv from 'dotenv'
dotenv.config({path:'./utils/.env'})

// import { users } from "@clerk/clerk-sdk-node";
 import './config/instrument.js'
import express from 'express'
import cors from 'cors'
  
import connectDB from './config/db.js';
import {clerkWebhooks} from './controller/webhook.js' 
import companyRoutes from './routes/companyRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoute.js'

import connectCloudinary from './config/cloudinary.js';
import {clerkMiddleware,requireAuth} from '@clerk/express'
// import { requireAuth } from '@clerk/clerk-sdk-node'
// Initialise Express
const app=express();
 
//connect to database
await connectDB();
await connectCloudinary();
//Middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.use(express.urlencoded())
// console.log("Clerk Secret Key:", process.env.CLERK_SECRET_KEY); // just to debug

 // Now you can call Clerk API, and it will use your secret key automatically


 
 //Routes
app.get('/',(req,res)=>{
   res.send('Working')
})
app.post('/webhooks',express.json(),clerkWebhooks)
//port

app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)
app.use('/api/chat',chatRoutes)
const PORT=process.env.PORT|| 5000
 app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`)
})

// export default app;
