import {Review} from "../models/reviewModel.js"
import {AppError} from "../middlewares/errorHandler.js"
import expressAsyncHandler from "express-async-handler"


export const createReview=expressAsyncHandler(async(req,res)=>{
try {
    const newRevew=await Review.create(req.body)
    res.status(201).json({status:true,data:newRevew})
} catch (error) {
    throw new AppError(error,400)
}
})


export const getAllReview=expressAsyncHandler(async(req,res)=>{
    try {
        const reviews=await Review.find()
        res.status(200).json({status:true,data:reviews})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const getReviewById=expressAsyncHandler(async(req,res)=>{
    try {
        const review=await Review.findOne({_id:req.params.id})
        res.status(200).json({status:true,data:review})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const updateReview=expressAsyncHandler(async(req,res)=>{
    try {
        const review=await Review.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate([{path:"user"},{path:"product"}])
        if(!review){
            throw new AppError("Review not found",404)
        }
        res.status(201).json({status:true,data:review})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const deleteReview=expressAsyncHandler(async(req,res)=>{
    try {
        const review=await Review.findByIdAndDelete(req.params.id)
        if(!review){
            throw new AppError("Review not found!",404)
        }
        res.status(200).json({status:true,message:"Review deleted  successfully!"})

    } catch (error) {
       throw new AppError(error,400) 
    }
})

export const approveReview=expressAsyncHandler(async(req,res)=>{
    try {
        const review=await Review.findByIdAndUpdate(req.params.id,{isApproved:req.body.isApproved},{new:true})
        if(!review){
            throw new AppError("Review not found",404)
        }
        res.status(201).json({status:true,message:"Review updated successfully!"})
    } catch (error) {
        throw new AppError(error,400)
    }
})