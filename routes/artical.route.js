const express=require("express")
const { articleModel } = require("../models/ArticalModel")
const articleRoute=express.Router()
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');





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
        status:false,
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





  











  
const AWSCredentials = ({
  accessKeyId: 'AKIASCYJ2FQPFWWTQTLG',
  secretAccessKey: '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',
  region: 'ap-south-1',
  bucketName: 'pradeep-bucket-2023'
});


const s3 = new AWS.S3({
  accessKeyId: AWSCredentials.accessKeyId,
  secretAccessKey: AWSCredentials.secretAccessKey
});



const upload = multer({ dest: 'uploads/' });

articleRoute.post('/upload/:id', upload.single('image'), (req, res) => {
  const file = req.file;
  const { id } = req.params

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const uploadParams = {
    Bucket: "pradeep-bucket-2023",
    Key: `${Date.now().toString()}.png`,
    Body: fs.createReadStream(file.path),
  };

  s3.upload(uploadParams, async (err, data) => {
    if (err) {
      console.error('Error uploading to S3:', err);
      return res.status(500).json({ message: 'Error uploading to S3.' });
    }

    else {
      fs.unlinkSync(file.path);
      try {
        await articleModel.findByIdAndUpdate({ _id: id }, { "$set": { image_url: data.Location } })
        res.send({ message: 'File uploaded successfully.', imageUrl: data.Location })
      }
      catch (err) {
        console.log("err")
        res.send({ message: "Something went wrong please try again" })
      }

    }
  });
});



articleRoute.patch("/publish/:id", async (req, res) => {
  const { id } = req.params
  try {
    await articleModel.findByIdAndUpdate({ _id: id }, { "$set": { status: true } })
    res.send({ message: "Data publish Successfully" })
  }
  catch (err) {
    console.log(err)
    res.send({ message: "Something went wrong please try again" })
  }
})








module.exports= {articleRoute}