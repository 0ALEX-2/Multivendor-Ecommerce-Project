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