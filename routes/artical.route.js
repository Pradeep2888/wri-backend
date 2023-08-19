const express=require("express")
const { articleModel } = require("../models/ArticalModel")
const articleRoute=express.Router()






articleRoute.get("/", async(req, res) => {
    const articledata=await articleModel.find()
    res.send({ message: "welcome to article route",data:articledata })
  })
  
  articleRoute.get("/singlearticle/:id", async(req, res) => {
    const {id}=req.params
    const articledata=await articleModel.findById({_id:id})
    res.send({ message: "welcome to article route",data:articledata })
  })




articleRoute.post("/add",async(req,res)=>{
    const {
        heading,
        resercher,
        event_manager,
        article_publish_detail,
        discription,
        state,
        event_type
    }=req.body


    try{
       const new_article=new articleModel({
        heading,
        resercher,
        event_manager,
        article_publish_detail,
        discription,
        state,
        status:"false",
        event_type
       })

       const result=await new_article.save()
       res.send({message:"Article save successfully"})
    }
    catch (err){
       res.send({message:"Something went wrong please try again"})
       console.log(err)
    } 
})



articleRoute.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    try {
      await articleModel.findOneAndRemove({ _id: id })
      res.send({ message: "Data Deleted Successfully" })
    }
    catch (err) {
      console.log(err)
      res.send({ message: "Something went wrong please try again" })
    }
  })



module.exports= {articleRoute}