import express from "express"
import { createProduct, deleteProduct, getAllProducts, getSingleProductBySlug, updateProduct } from "../controllers/productControler.js"

const productRouter=express.Router()

productRouter.get("/",getAllProducts)
productRouter.get("/:slug",getSingleProductBySlug)
productRouter.post("/",createProduct)
productRouter.put("/",updateProduct)
productRouter.delete("/",deleteProduct)

export default productRouter