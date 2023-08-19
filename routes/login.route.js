const express=require("express")
const loginRoute=express.Router()
const jwt = require('jsonwebtoken');
require("dotenv").config()


loginRoute.get("/",(req,res)=>{
    res.send({"message":"welcome to login route"})
})



loginRoute.post("/user/admin",async(req,res)=>{
   const {email,password}=req.body
  
   console.log(process.env.ADMIN_ID,process.env.ADMIN_PASSWORD,email,password)
   if(email===process.env.ADMIN_ID && password===process.env.ADMIN_PASSWORD){
       const user_detail={type:"admin"}
       const token = jwt.sign({ user_detail }, process.env.SECRET_KEY);
       res.send({ "mesg": "Login sucessfull", "token": token })
   }
   else{
    res.send({"message":"Please Provide Correct Email and Password"})
   }

})

loginRoute.post("/user/developer",async(req,res)=>{
   const {email,password}=req.body
  
    if(email===process.env.DEVELOPER_ID && password===process.env.DEVELOPER_PASSWORD){
       const user_detail={type:"developer"}
       const token = jwt.sign({ user_detail }, process.env.SECRET_KEY);
       res.send({ "mesg": "Login sucessfull", "token": token })
   }
   else{
    res.send({"message":"Please Provide Correct Email and Password"})
   }

})





module.exports={loginRoute}