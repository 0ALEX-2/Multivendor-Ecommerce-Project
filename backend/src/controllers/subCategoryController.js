import {SubCategory} from "../models/subCategoryModel.js"
import {AppError} from "../middlewares/errorHandler.js"
import expressAsyncHandler from "express-async-handler"


export const createSubCategory=expressAsyncHandler(async(req,res)=>{
try {
    const newSubCategory=await SubCategory.create(req.body)
    res.status(201).json({status:true,data:newSubCategory})
} catch (error) {
    throw new AppError(error,400)
}
})


export const getAllSubCategorys=expressAsyncHandler(async(req,res)=>{
    try {
        const SubCategorys=await SubCategory.find()
        res.status(200).json({status:true,data:SubCategorys})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const getSingleSubCategoryBySlug=expressAsyncHandler(async(req,res)=>{
    try {
        const SubCategory=await SubCategory.findOne({slug:req.params.slug})
        res.status(200).json({status:true,data:SubCategory})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const updateSubCategory=expressAsyncHandler(async(req,res)=>{
    try {
        const SubCategory=await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!SubCategory){
            throw new AppError("SubCategory not found",404)
        }
        res.status(201).json({status:true,data:SubCategory})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const deleteSubCategory=expressAsyncHandler(async(req,res)=>{
    try {
        const SubCategory=await SubCategory.findByIdAndDelete(req.params.id)
        if(!SubCategory){
            throw new AppError("SubCategory not found!",404)
        }
        res.status(200).json({status:true,message:"SubCategory deleted  successfully!"})

    } catch (error) {
       throw new AppError(error,400) 
    }
})