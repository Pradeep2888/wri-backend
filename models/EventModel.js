const mongoose=require("mongoose")


const eventSchema=new mongoose.Schema({
    heading:{type:String},
    date:{type:String},
    start_time:{type:String},
    end_time:{type:String},
    agenda_url:{type:String},
    event_manager:[{name:{type:String},email:{type:String},phone:{type:String}}],
    discription:[{text:String,inputsAndCheckboxes:[{word:String,url:String,yellow:Boolean,black:Boolean}]}],
    video_url:[],
    report_url:[],
    place:{type:String},
    state:{type:String},
    event_type:{type:String},
    image_url:{type:String},
    status:{type:Boolean},
    
})


const eventModel=mongoose.model("event",eventSchema)

module.exports={eventModel}