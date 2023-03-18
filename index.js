const express=require("express")
const {connection}=require("./config/db")
const { userRouter } = require("./routes/user.routes")
const {flightRouter}=require("./routes/flight.routes")
const {bookingRouter}=require("./routes/booking.routes")
const app=express()
require("dotenv").config()
app.use(express.json())



app.use("/api",userRouter)
app.use("/api",flightRouter)
app.use("/api",bookingRouter)



const PORT=process.env.PORT||8000
app.listen(PORT,async(req,res)=>{
    try{
await connection
console.log("connected to mongodb")
    }
    catch(err){
        console.log(err)
    }
    console.log(`server running on port ${PORT}`)
})