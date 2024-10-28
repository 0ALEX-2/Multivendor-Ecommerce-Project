import mongoose from "mongoose"

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:String,
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    subCategories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }]
}, {timestamps:true})

export const Category=mongoose.model("Category",categorySchema)