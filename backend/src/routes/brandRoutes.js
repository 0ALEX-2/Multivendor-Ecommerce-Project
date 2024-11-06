import express from "express"
import { createBrand, deleteBrand, getAllBrands, getSingleBrandBySlug, updateBrand } from "../controllers/brandController.js"

const brandRouter=express.Router()

brandRouter.get("/",getAllBrands)
brandRouter.get("/:slug",getSingleBrandBySlug)
brandRouter.post("/",createBrand)
brandRouter.put("/",updateBrand)
brandRouter.delete("/",deleteBrand)

export default brandRouter