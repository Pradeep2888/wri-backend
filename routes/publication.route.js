const express=require("express")
const { publicationModel } = require("../models/PublicationModel")
const publicationRoute=express.Router()
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');




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
      status:false
       })

       const result=await new_publication.save()
       res.send({message:"Publication save successfully"})
    }
    catch (err){
       res.send({message:"Something went wrong please try again"})
       console.log(err)
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

publicationRoute.post('/upload/:id', upload.single('image'), (req, res) => {
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
        await publicationModel.findByIdAndUpdate({ _id: id }, { "$set": { image_url: data.Location } })
        res.send({ message: 'File uploaded successfully.', imageUrl: data.Location })
      }
      catch (err) {
        console.log("err")
        res.send({ message: "Something went wrong please try again" })
      }

    }
  });
});



publicationRoute.patch("/publish/:id", async (req, res) => {
  const { id } = req.params
  try {
    await publicationModel.findByIdAndUpdate({ _id: id }, { "$set": { status: true } })
    res.send({ message: "Data publish Successfully" })
  }
  catch (err) {
    console.log(err)
    res.send({ message: "Something went wrong please try again" })
  }
})












module.exports={publicationRoute}