const mongoose=require("mongoose")


const podcastSchema=new mongoose.Schema({
    episod_name:{type:String},
    episod_url:{type:String},
    episod_title:{type:String},
    episod_number:{type:Number},
    filter_by:{type:String},
    state:{type:String},
    status:{type:Boolean},
})


const podcastModel=mongoose.model("podcast",podcastSchema)

module.exports={podcastModel}