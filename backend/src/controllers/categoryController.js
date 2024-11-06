import {Category} from "../models/categoryModel.js"
import {AppError} from "../middlewares/errorHandler.js"
import expressAsyncHandler from "express-async-handler"


export const createCategory=expressAsyncHandler(async(req,res)=>{
try {
    const newCategory=await Category.create(req.body)
    res.status(201).json({status:true,data:newCategory})
} catch (error) {
    throw new AppError(error,400)
}
})


export const getAllCategorys=expressAsyncHandler(async(req,res)=>{
    try {
        const Categorys=await Category.find()
        res.status(200).json({status:true,data:Categorys})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const getSingleCategoryBySlug=expressAsyncHandler(async(req,res)=>{
    try {
        const Category=await Category.findOne({slug:req.params.slug})
        res.status(200).json({status:true,data:Category})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const updateCategory=expressAsyncHandler(async(req,res)=>{
    try {
        const Category=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!Category){
            throw new AppError("Category not found",404)
        }
        res.status(201).json({status:true,data:Category})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const deleteCategory=expressAsyncHandler(async(req,res)=>{
    try {
        const Category=await Category.findByIdAndDelete(req.params.id)
        if(!Category){
            throw new AppError("Category not found!",404)
        }
        res.status(200).json({status:true,message:"Category deleted  successfully!"})

    } catch (error) {
       throw new AppError(error,400) 
    }
})