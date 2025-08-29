import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, unique: true },
  
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String },
  image: { type: String,   },
  resumePublicId:{type:String},
});

const User = mongoose.model('User', userSchema);
export default User;
