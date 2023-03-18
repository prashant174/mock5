const mongoose=require("mongoose")

const bookingSchema=mongoose.Schema({
  
    name: String,
    email: String,
    airline: String,
    flightNo: String,
    departure: String,
    arrival: String,
    departureTime: Date,
    arrivalTime: Date,
    seats: Number,
    price: Number
    
     
})

const BookingModel=mongoose.model("booking",bookingSchema)

module.exports={BookingModel}