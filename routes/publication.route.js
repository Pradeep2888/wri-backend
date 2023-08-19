const express=require("express")
const { publicationModel } = require("../models/PublicationModel")
const publicationRoute=express.Router()




publicationRoute.get("/", async(req, res) => {
   const publicationdata=await publicationModel.find()
   res.send({ message: "welcome to publication route",data:publicationdata })
 })
 
 publicationRoute.get("/singlepublication/:id", async(req, res) => {
   const {id}=req.params
   const publicationdata=await publicationModel.findById({_id:id})
   res.send({ message: "welcome to publication route",data:publicationdata })
 })


 publicationRoute.delete("/delete/:id", async (req, res) => {
   const { id } = req.params
   try {
     await publicationModel.findOneAndRemove({ _id: id })
     res.send({ message: "Data Deleted Successfully" })
   }
   catch (err) {
     console.log(err)
     res.send({ message: "Something went wrong please try again" })
   }
 })




publicationRoute.post("/add",async(req,res)=>{
    const {
       heading,
       date,
      discription,
      report_url,
      publisher,
      publication_filter,
      state
   }=req.body


   console.log(req.body)

    try{
       const new_publication=new publicationModel({
         heading,
       date,
      discription,
      report_url,
      publisher,
      publication_filter,
      state,
      status:"false"
       })

       const result=await new_publication.save()
       res.send({message:"Publication save successfully"})
    }
    catch (err){
       res.send({message:"Something went wrong please try again"})
       console.log(err)
    } 
})

module.exports={publicationRoute}