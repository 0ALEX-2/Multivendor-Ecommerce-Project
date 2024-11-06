import {Wishlist} from "../models/WishlistModel.js"
import {AppError} from "../middlewares/errorHandler.js"
import expressAsyncHandler from "express-async-handler"


export const createWishlist=expressAsyncHandler(async(req,res)=>{
try {
    const newWishlist=await Wishlist.create(req.body)
    res.status(201).json({status:true,data:newWishlist})
} catch (error) {
    throw new AppError(error,400)
}
})


export const getAllWishlists=expressAsyncHandler(async(req,res)=>{
    try {
        const Wishlists=await Wishlist.find()
        res.status(200).json({status:true,data:Wishlists})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const getSingleWishlistBySlug=expressAsyncHandler(async(req,res)=>{
    try {
        const Wishlist=await Wishlist.findOne({slug:req.params.slug})
        res.status(200).json({status:true,data:Wishlist})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const updateWishlist=expressAsyncHandler(async(req,res)=>{
    try {
        const Wishlist=await Wishlist.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!Wishlist){
            throw new AppError("Wishlist not found",404)
        }
        res.status(201).json({status:true,data:Wishlist})
    } catch (error) {
        throw new AppError(error,400)
    }
})

export const deleteWishlist=expressAsyncHandler(async(req,res)=>{
    try {
        const Wishlist=await Wishlist.findByIdAndDelete(req.params.id)
        if(!Wishlist){
            throw new AppError("Wishlist not found!",404)
        }
        res.status(200).json({status:true,message:"Wishlist deleted  successfully!"})

    } catch (error) {
       throw new AppError(error,400) 
    }
})