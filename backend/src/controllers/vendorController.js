import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import {Vendor} from "../models/vendorModel.js"

export const createVendor=expressAsyncHandler(async(req,res)=>{
    try {
        const newVendor=await Vendor.create(req.body)
        res.status(201).json({status:true,data:newVendor})
    } catch (error) {
        throw new AppError("Something went wrong!",400)
    }
})

export const getVendors=expressAsyncHandler(async(req,res)=>{
    try {
        const vendors=await Vendor.find().populate("user")
        res.status(201).json({status:true,data:vendors})
    } catch (error) {
         throw new AppError("Something went wrong!",400)
    }
})

export const getVendorBySlug=expressAsyncHandler(async(req,res)=>{
    try {
        const vendor=await Vendor.findOne({slug:req.params.slug}).populate("user","-password")
        res.status(201).json({status:true,data:vendor})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const updateVendor=expressAsyncHandler(async(req,res)=>{
    try {
        const vendor=await Vendor.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        if(!vendor){
            throw new AppError("Vendor not found!",404)
        }
        res.status(201).json({status:true,data:vendor})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const deleteVendor=expressAsyncHandler(async(req,res)=>{
    try {
        const vendor=await Vendor.findByIdAndDelete(req.params.id)
        if(!vendor){
            throw new AppError("Vendor not found",404)
        }
       res.status(200).json({status:true,message:"Vendor deleted successfully!"})    
    } catch (error) {
        throw new AppError(error,400)
    }
})