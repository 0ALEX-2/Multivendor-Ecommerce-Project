import express from "express"
import { createCategory, deleteCategory, getAllCategorys, getSingleCategoryBySlug, updateCategory } from "../controllers/categoryController.js"

const categoryRouter=express.Router()

categoryRouter.get("/",getAllCategorys)
categoryRouter.get("/:slug",getSingleCategoryBySlug)
categoryRouter.post("/",createCategory)
categoryRouter.put("/",updateCategory)
categoryRouter.delete("/",deleteCategory)

export default categoryRouter