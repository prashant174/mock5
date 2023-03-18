const express=require("express")
const {UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
   const isUser=await UserModel.findOne({email})
   
   if(isUser){
    res.status(200).send({"msg":"user already exists"})
   }
   else{
    try{
        bcrypt.hash(password,10,async function(err,hash){
            const user=new UserModel({name,email,password:hash})
            await user.save()
            res.status(201).send({"msg":"Registration successfull","password":hash})
            console.log(user)

        })
     
    }catch(err){
        console.log(err)
        res.status(200).send({"msg":"Please try again later something went wrong"})
    }
   }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user= await UserModel.find({email})
        if(user.length>0){
            const hashPassword=user[0].password
            bcrypt.compare(password,hashPassword,function(err,result){
                if(result){
                    const token=jwt.sign({"userId":user[0]._id},"hush")
                    res.status(201).send({"msg":"Login successfull","token":token})
                }
                else{
                    res.status(200).send({"msg":"Login Failed"})
                }
            })
        }
    }catch(err){
        console.log(err)
        res.status(200).send({"msg":"Please try again later something went wrong"})
    }
})



module.exports={userRouter}