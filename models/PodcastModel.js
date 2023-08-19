const mongoose=require("mongoose")


const podcastSchema=new mongoose.Schema({
    episod_name:{type:String},
    episod_url:{type:String},
    filter_by:{type:String},
    state:{type:String},
})


const podcastModel=mongoose.model("podcast",podcastSchema)

module.exports={podcastModel}