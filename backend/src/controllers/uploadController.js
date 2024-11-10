import https from "https"
import fs from "fs"
import expressAsyncHandler from "express-async-handler"

const BASE_HOSTNAME="storage.bunnycdn.com"
const HOSTNAME=BASE_HOSTNAME
const ACCESS_KEY=""
const STORAGE_ZONE_NAME=""

export const uploadFile=expressAsyncHandler(async(req,res)=>{
    if(!req.file){
        return res.status(400).send({message:"No file uploaded."})
    }
    const file=req.file
    const filePath=file.path
    const fileName=encodeURIComponent(file.originalname)

    const readStream=fs.createReadStream(filePath)

    const option={
        method:"PUT",
        hostname:HOSTNAME,
        path:`${STORAGE_ZONE_NAME}/${fileName}`,
        Headers:{
            AccessKey:ACCESS_KEY,
            "Content-Type":"application/octate-stream"
        }
    }
    const reqBunny=https.request(option,(respose)=>{
        respose.on("data",(chunk)=>{
            console.log(chunk.toString("utf-8"))
        })
        reqBunny.on("error",(error)=>{
            console.error(error)
        })
        readStream.pipe(reqBunny)
        const path=`${reqBunny.path}`
        setTimeout(()=>{

        })
    })
})