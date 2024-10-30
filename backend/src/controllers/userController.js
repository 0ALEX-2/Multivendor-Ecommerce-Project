import {User} from "../models/userModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import expressAsyncHandler from "express-async-handler"

export const registerUser=expressAsyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
         
    try {
        const userExists=await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"User already exists"})
        } 
        const user=await User.create({
            name,email,password
        })  
        if(user){
            res.status(201).json({
                user
            })
        }else{
            res.status(400).json({message:"Invalid User Data."})
        }    
    } catch (error) {
        
    }
})


// 7 min