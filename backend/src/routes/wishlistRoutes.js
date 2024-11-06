import express from "express"
import { createWishlist, deleteWishlist, getAllWishlists, getSingleWishlistBySlug, updateWishlist } from "../controllers/wishlistController.js"

const wishlistRouter=express.Router()

wishlistRouter.get("/",getAllWishlists)
wishlistRouter.get("/:slug",getSingleWishlistBySlug)
wishlistRouter.post("/",createWishlist)
wishlistRouter.put("/",updateWishlist)
wishlistRouter.delete("/",deleteWishlist)

export default wishlistRouter