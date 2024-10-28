import mongoose from "mongoose"

const productVariationSchema=mongoose.Schema({
    color:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        min:0,
        require:true
    },
    price:{
        type:Number,
        required:true
    }
})

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:String,
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Brand",
        required:true
    },
    image:[String],
    variations:[productVariationSchema],
    ratingAverage:{
        type:Number,
        default:0
    },
    ratingQuantity:{
        type:Number,
        default:0
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }]
},{timestamps:true})

export const Product=mongoose.model("Product",productSchema)

//https://www.youtube.com/watch?v=HFtDhUzPBWc&list=PL0g02APOH8okLw8bOxyPlWw9BbaJoRpC4&index=1&t=547s
//34 min