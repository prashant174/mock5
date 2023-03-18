const express=require("express")
const {FlightModel}=require("../models/flight.model")

const flightRouter=express.Router()


flightRouter.get("/flights",async(req,res)=>{
    const flightList=await FlightModel.find()
    res.status(200).send(flightList)
})

flightRouter.get("/flights/:id",async(req,res)=>{
    const id=req.params.id
   const details =await FlightModel.findById({_id:id})
   res.status(200).send(details)
})

flightRouter.post("/flights",async(req,res)=>{
    const payload=req.body
   try{
const flight=new FlightModel(payload)
await flight.save()
res.status(201).send({"msg":"Flight added successfully"})
   }catch(err){
    console.log(err)
    res.status(500).send("something went wrong")
   }
})

flightRouter.patch("/flights/:id",async(req,res)=>{
    const id=req.params.id
    const payload=req.body
   const details =await FlightModel.findByIdAndUpdate({_id:id},payload)
   res.status(204).send("Updated successfully")
})

flightRouter.delete("/flights/:id",async(req,res)=>{
    const id=req.params.id
  
   const details =await FlightModel.findByIdAndDelete({_id:id})
   res.status(202).send("Updated successfully")
})

module.exports={flightRouter}