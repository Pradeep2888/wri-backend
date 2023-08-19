const express = require("express")
const { podcastModel } = require("../models/PodcastModel")
const podcastRoute = express.Router()



podcastRoute.post("/add", async (req, res) => {
    const { episod_name, episod_url, filter_by, state, } = req.body

    try {
        const new_podcast = new podcastModel({
            episod_name,
            episod_url,
            filter_by,
            state,
        })

        const result = await new_podcast.save()
        res.send({ message: "Podcast save successfully" })
    }
    catch (err) {
        res.send({ message: "Something went wrong please try again" })
        console.log(err)
    }
})

module.exports={podcastRoute}