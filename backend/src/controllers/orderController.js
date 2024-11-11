import expressAsyncHandler from "express-async-handler"
import {AppError} from "../middlewares/errorHandler.js"
import {Order} from "../models/orderModel.js"

export const createOrder=expressAsyncHandler(async(req,res)=>{
    try {
        const order=new Order(req.body)
        await order.save()
        res.status(201).json({status:true,data:order})
    } catch (error) {
        throw new AppError(error)
    }
})

export const getAllOrders=expressAsyncHandler(async(req,res)=>{
    try {
        const orders=await Order.find().populate("user items.product")
        res.status(200).json({status:true,data:orders})
    } catch (error) {
        throw new AppError(error)
    }
})

export const getSingleOrderById=expressAsyncHandler(async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate("user items.product")
        res.status(200).json({status:true,data:order})
    } catch (error) {
        throw new AppError(error)
    }
})

export const updateOrder=expressAsyncHandler(async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id,req.body,{new:true})
        if(!order){
            return res.status(400).json({status:false,message:"Order not found!"})
        }
        res.status(200).json({status:true,data:order})
    } catch (error) {
        throw new AppError(error)
    }
})

export const deleteOrder=expressAsyncHandler(async(req,res)=>{
    try {
        const order=await Order.findByIdAndDelete(req.params.id)
        if(!order){
            return res.status(400).json({status:false,message:"Order not found!"})
        }
        res.status(200).json({status:true,message:"Order deleted"})
    } catch (error) {
        throw new AppError(error)
    }
})

const updateOrderStatus=expressAsyncHandler(async(req,res)=>{
    try {
        const {status}=req.body
        const order=await Order.findByIdAndUpdate(req.params.id,{status},{new:true})
        if(!order){
            return res.status(400).json({status:false,message:"Order not found!"})
        }
        res.status(200).json({status:true,data:order})
    } catch (error) {
        throw new AppError(error)
    }
})

export const handleOrderCancellation=expressAsyncHandler(async(req,res)=>{
    try {
        const {reason}=req.body
        const order=await Order.findByIdAndUpdate(
            req.params.id,
            {status:"cancelled",cancellation:{reason,createdAt:new Date()}},
            {new:true}
        )
        if(!order){
            return res.status(400).json({status:false,message:"Order not found!"})
        }
        res.status(201).json({status:true,data:order})
    } catch (error) {
        throw new AppError(error)
    }
})

export const handleOrderReturn=expressAsyncHandler(async(req,res)=>{
    try {
        const {reason}=req.body
        const order=await Order.findByIdAndUpdate(
            req.params.id,
            {return:{reason,createdAt:new Date(),status:"pending"}},
            {new:true}
        )
        if(!order){
            return res.status(400).json({status:false,message:"Order not found!"})
        }
        res.status(201).json({status:true,data:order})
    } catch (error) {
        throw new AppError(error)
    }
})