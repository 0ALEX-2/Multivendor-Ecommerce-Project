import express from "express"
import { createVendor, deleteVendor, getVendorBySlug, getVendors, updateVendor } from "../controllers/vendorController.js"
import {protect} from "../middlewares/authMiddleware.js"

const vendorRouter=express.Router()

vendorRouter.post("/vendor",protect,createVendor)
vendorRouter.get("/vendors",protect,getVendors)
vendorRouter.get("/vendor/:slug",protect,getVendorBySlug)
vendorRouter.delete("/vendor/:id",protect,deleteVendor)
vendorRouter.put("/vendor/:id",protect,updateVendor)

export default vendorRouter