import {User} from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import expressAsyncHandler from "express-async-handler"
import { genetareToken } from "../utils/utils.js"
import { AppError } from "../middlewares/errorHandler.js"

//---------------------User Registration------------------
export const registerUser=expressAsyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
        const userExists=await User.findOne({email})
        if(userExists){
            throw new AppError("User Already Exists!",400)
        } 
        const user=await User.create({
            name,email,password
        })  
        if(user){
            res.status(201).json({
                user
            })
        }else{
            throw new AppError("Invalid User data!",400)
        }    
})

//----------------User Login---------------------
export const loginUser=expressAsyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(user && (await user.comparePassword(password,user.password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:genetareToken(user._id)
        })
    }else{
        throw new AppError("Invalid Email or Password!",400)
    }
})


// 7 min