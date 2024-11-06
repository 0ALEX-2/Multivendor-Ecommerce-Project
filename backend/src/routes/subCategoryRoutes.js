import express from "express"
import { createSubCategory, deleteSubCategory, getAllSubCategorys, getSingleSubCategoryBySlug, updateSubCategory } from "../controllers/subCategoryController.js"

const subCategoryRouter=express.Router()

subCategoryRouter.get("/",getAllSubCategorys)
subCategoryRouter.get("/:slug",getSingleSubCategoryBySlug)
subCategoryRouter.post("/",createSubCategory)
subCategoryRouter.put("/",updateSubCategory)
subCategoryRouter.delete("/",deleteSubCategory)

export default subCategoryRouter