import {Brand} from "../models/brandModel.js"
import {AppError} from "../middlewares/errorHandler.js"
import expressAsyncHandler from "express-async-handler"


export const createBrand=expressAsyncHandler(async(req,res)=>{
try {
    const newBrand=await Brand.create(req.body)
    res.status(201).json({status:true,data:newBrand})
} catch (error) {
    throw new AppError(error,400)
}
})


export const getAllBrands=expressAsyncHandler(async(req,res)=>{
    try {
        const brands=await Brand.find()
        res.status(200).json({status:true,data:brands})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const getSingleBrandBySlug=expressAsyncHandler(async(req,res)=>{
    try {
        const brand=await Brand.findOne({slug:req.params.slug})
        res.status(200).json({status:true,data:brand})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const updateBrand=expressAsyncHandler(async(req,res)=>{
    try {
        const brand=await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!brand){
            throw new AppError("Brand not found",404)
        }
        res.status(201).json({status:true,data:brand})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const deleteBrand=expressAsyncHandler(async(req,res)=>{
    try {
        const brand=await Brand.findByIdAndDelete(req.params.id)
        if(!brand){
            throw new AppError("Brand not found!",404)
        }
        res.status(200).json({status:true,message:"Brand deleted  successfully!"})

    } catch (error) {
       throw new AppError(error,400) 
    }
})