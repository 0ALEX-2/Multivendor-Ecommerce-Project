import mongoose from "mongoose"
import slugify from "slugify"

const subCategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:String,
    description:String, 
}, {timestamps:true})

subCategorySchema.pre("save",async function(next){
    this.slug=slugify(this.name.toLowerCase())
    next()
})

export const SubCategory=mongoose.model("SubCategory",subCategorySchema)