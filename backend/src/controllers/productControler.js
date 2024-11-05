import { Product } from "../models/productModel.js";
import {AppError} from "../middlewares/errorHandler.js"
import expressAsyncHandler from "express-async-handler"


export const createProduct=expressAsyncHandler(async(req,res)=>{
try {
    const newProduct=await (await Product.create(req.body)).populate("vendor")
    res.status(201).json({status:true,data:newProduct})
} catch (error) {
    throw new AppError(error,400)
}
})


export const getAllProducts=expressAsyncHandler(async(req,res)=>{
    try {
        const products=await Product.find()
        res.status(200).json({status:true,data:products})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const getSingleProductBySlug=expressAsyncHandler(async(req,res)=>{
    try {
        const product=await Product.findOne({slug:req.params.slug})
        res.status(200).json({status:true,data:product})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const updateProduct=expressAsyncHandler(async(req,res)=>{
    try {
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!product){
            throw new AppError("Product not found",404)
        }
        res.status(201).json({status:true,data:product})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const deleteProduct=expressAsyncHandler(async(req,res)=>{
    try {
        const product=await Product.findByIdAndDelete(req.params.id)
        if(!product){
            throw new AppError("Product not found!",404)
        }
        res.status(200).json({status:true,message:"Product deleted  successfully!"})

    } catch (error) {
       throw new AppError(error,400) 
    }
})