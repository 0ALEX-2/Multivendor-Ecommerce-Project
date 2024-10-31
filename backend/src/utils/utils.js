import jwt from "jsonwebtoken"
import mongoose from "mongoose"

export const genetareToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}

export const dbConnect=()=>mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("Database Connected")).catch((err)=>{console.log("MongoDB Connection Error:",err)})
