const express = require("express")
const { podcastModel } = require("../models/PodcastModel")
const podcastRoute = express.Router()



podcastRoute.get("/", async(req, res) => {
    const publicationdata=await podcastModel.find()
    res.send({ message: "welcome to publication route",data:publicationdata })
  })
  
  podcastRoute.get("/singlepodcast/:id", async(req, res) => {
    const {id}=req.params
    const publicationdata=await podcastModel.findById({_id:id})
    res.send({ message: "welcome to publication route",data:publicationdata })
  })
 
 
  podcastRoute.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    try {
      await podcastModel.findOneAndRemove({ _id: id })
      res.send({ message: "Data Deleted Successfully" })
    }
    catch (err) {
      console.log(err)
      res.send({ message: "Something went wrong please try again" })
    }
  })

podcastRoute.post("/add", async (req, res) => {
    const { episod_name, episod_url, filter_by, state, } = req.body
    console.log(episod_name, episod_url, filter_by, state,)

    try {
        const new_podcast = new podcastModel({
            episod_name,
            episod_url,
            filter_by,
            state,
        })

        const result = await new_podcast.save()
        res.send({ message: "podcast save successfully" })
    }
    catch (err) {
        res.send({ message: "Something went wrong please try again" })
        console.log(err)
    }
})

module.exports={podcastRoute}