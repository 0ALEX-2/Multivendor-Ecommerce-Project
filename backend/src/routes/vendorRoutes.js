import express from "express"
import { createVendor, getVendors } from "../controllers/vendorController.js"
import {protect} from "../middlewares/authMiddleware.js"

const vendorRouter=express.Router()

vendorRouter.post("/vendor",protect,createVendor)
vendorRouter.get("/vendors",protect,getVendors)

export default vendorRouter