const express = require("express")
const eventRoute = express.Router()
const { eventModel } = require("../models/EventModel")
const multer = require('multer');
const fs = require('fs');
const sizeOf = require('image-size');
const sharp = require('sharp');

eventRoute.get("/", async(req, res) => {
  const eventdata=await eventModel.find()
  res.send({ message: "welcome to event route",data:eventdata })
})

eventRoute.get("/singleevent/:id", async(req, res) => {
  const {id}=req.params
  const eventdata=await eventModel.findById({_id:id})
  res.send({ message: "welcome to event route",data:eventdata })
})

eventRoute.post("/add", async (req, res) => {
   const { heading,date,start_time,end_time,agenda_url,event_manager,discription,video_url,place,state,event_type, report_url}=req.body

   try{
      const new_event=new eventModel({
        heading,
        date,
        start_time,
        end_time,
        agenda_url,
        event_manager,
        discription,
        video_url,
        place,
        state,
        event_type,
        report_url,
        status:"false"
      })

      const result=await new_event.save()
      res.send({message:"Event save successfully"})
   }
   catch (err){
      res.send({message:"Something went wrong please try again"})
      console.log(err)
   }
  // res.send({ message: "Something went wrong please try again" })
})



eventRoute.delete("/delete/:id", async (req, res) => {
  const { id } = req.params
  try {
    await eventModel.findOneAndRemove({ _id: id })
    res.send({ message: "Data Deleted Successfully" })
  }
  catch (err) {
    console.log(err)
    res.send({ message: "Something went wrong please try again" })
  }
})





eventRoute.patch("/update/:id", async (req, res) => {
  const { id } = req.params
  const {date,start_time,end_time}=req.body
  try {
    await eventModel.findByIdAndUpdate({_id:id},{"$set":{ "date":date, "start_time": start_time, "end_time":end_time }})
    res.send({ message: "Data Update Successfully" })
  }
  catch (err) {
    console.log(err)
    res.send({ message: "Something went wrong please try again" })
  }
})









const upload = multer({ dest: 'uploads/' });

eventRoute.post('/upload', upload.single('image'), async (req, res, next) => {
  if (!req.file) {
    return res.send({ message: 'No image file provided' });
  }

  const dimensions = await sharp(req.file.path).metadata();


  const maxWidth = 1800;
  const maxHeight = 1600;

  if (dimensions.width > maxWidth || dimensions.height > maxHeight) {
    fs.unlinkSync(req.file.path);
    return res.send({ message: 'Image size exceeds the allowed dimensions' });
  }

  const newFileName = req.file.originalname.replace(/\.[^/.]+$/, '') + '.png';
  const newPath = req.file.path.replace(/\.[^/.]+$/, '') + '.png';

  try {
    await sharp(req.file.path).toFile(newPath);
    fs.unlinkSync(req.file.path);
  } catch (err) {
    console.error('Error processing the image:', err);
    return res.send({ message: 'Failed to process the image' });
  }

  return res.send({ message: 'Image uploaded and saved successfully' });

});





module.exports = { eventRoute }