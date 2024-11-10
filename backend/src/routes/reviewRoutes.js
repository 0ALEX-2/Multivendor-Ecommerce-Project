import express from "express"
import { approveReview, createReview, deleteReview, getAllReview, getReviewById, updateReview } from "../controllers/reviewController.js"



const reviewRouter=express.Router()

reviewRouter.post("/create",createReview)
reviewRouter.get("/all",getAllReview)
reviewRouter.get("/:id",getReviewById)
reviewRouter.put("/:id",updateReview)
reviewRouter.put("/approve-request",approveReview)
reviewRouter.delete("/:id",deleteReview)


export default reviewRouter