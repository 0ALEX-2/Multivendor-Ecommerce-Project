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

export const profile=expressAsyncHandler(async(req,res)=>{
    const {_id}=req.body

    const user=await User.findById(_id)
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            phone:user.phone,
            isActive:user.isActive
        })
    }else{ 
        throw new AppError("User not found!")
    }
})

export const updateProfile=expressAsyncHandler(async(req,res)=>{
    const {_id}=req.body

    const user=await User.findById(_id)
    if(user){
       user.name=req.body.name || user.name;
       user.email=req.body.email || user.email;
       user.address=req.body.address || user.address;
       user.phone=req.body.phone || user.phone;
       if(req.body.password){user.password=req.body.password}

       const updateUser=await User.save()

        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            phone:user.phone,
            isActive:user.isActive,
            address:user.address
        })
    }else{ 
        throw new AppError("User not found!")
    }
})

export const getAllProfile=expressAsyncHandler(async(req,res)=>{
    const users=await User.find()
    if(users){
        res.json(users)
    }else{
        throw new AppError("Users not found")
    }
})

export const deleteUserProfile=expressAsyncHandler(async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({ message: "User deleted successfully." })
    } catch (error) {
        throw new AppError("User not found!")
    }
})

