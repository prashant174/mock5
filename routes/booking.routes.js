const express=require("express")
const {BookingModel}=require("../models/booking.model")

const bookingRouter=express.Router()

bookingRouter.post("/booking",async(req,res)=>{
    const payload=req.body
    try{
 const booking=new BookingModel(payload)
 await booking.save()
 res.status(201).send({"msg":"booking successfully"})
    }catch(err){
     console.log(err)
     res.status(500).send("something went wrong")
    }
})

bookingRouter.get("/dashboard",async(req,res)=>{
    const bookingList=await BookingModel.find()
    res.status(200).send(bookingList)
})


module.exports={bookingRouter}