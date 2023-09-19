const express = require("express")
const eventRoute = express.Router()
const { eventModel } = require("../models/EventModel")
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');


eventRoute.get("/", async (req, res) => {
  const eventdata = await eventModel.find()
  res.send({ message: "welcome to event route", data: eventdata })
})

eventRoute.get("/singleevent/:id", async (req, res) => {
  const { id } = req.params
  const eventdata = await eventModel.findById({ _id: id })
  res.send({ message: "welcome to event route", data: eventdata })
})

eventRoute.post("/add", async (req, res) => {
  const { heading, date, start_time, end_time, agenda_url, event_manager, discription, video_url, place, state, event_type, report_url } = req.body

  try {
    const new_event = new eventModel({
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
      status: false,
      image_url:""
    })

    const result = await new_event.save()
    res.send({ message: "Event save successfully" })
  }
  catch (err) {
    res.send({ message: "Something went wrong please try again" })
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
  const { date, start_time, end_time } = req.body
  try {
    await eventModel.findByIdAndUpdate({ _id: id }, { "$set": { "date": date, "start_time": start_time, "end_time": end_time } })
    res.send({ message: "Data Update Successfully" })
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

eventRoute.post('/upload/:id', upload.single('image'), (req, res) => {
  const file = req.file;
  const { id } = req.params
  console.log(id)

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
      await fs.unlinkSync(file.path);
      try {
        let a=await eventModel.findByIdAndUpdate({ _id: id }, { "$set": { image_url: data.Location } })
        res.send({ message: 'File uploaded successfully.', imageUrl: "data.Location" })
      }
      catch (err) {
        console.log("err")
        res.send({ message: "Something went wrong please try again" })
      }

    }
  });
});



eventRoute.patch("/publish/:id", async (req, res) => {
  const { id } = req.params
  try {
    await eventModel.findByIdAndUpdate({ _id: id }, { "$set": { status: true } })
    res.send({ message: "Data publish Successfully" })
  }
  catch (err) {
    console.log(err)
    res.send({ message: "Something went wrong please try again" })
  }
})







module.exports = { eventRoute }