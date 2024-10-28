import mongoose from "mongoose";

const wishlistSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
},{timestamps:true})

export const Wishlist=mongoose.model("Wishlist",wishlistSchema)

//https://www.youtube.com/watch?v=HFtDhUzPBWc&list=PL0g02APOH8okLw8bOxyPlWw9BbaJoRpC4&index=1&t=547s
//43 min