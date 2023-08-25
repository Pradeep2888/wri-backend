const mongoose=require("mongoose")


const articleSchema=new mongoose.Schema({
    heading:{type:String},
    resercher:{type:String},
    event_manager:[{name:{type:String},email:{type:String},phone:{type:Number}}],
    article_publish_detail:[{newspaper:{type:String},date:{type:String},url:{type:String}}],
    discription:[{text:String,inputsAndCheckboxes:[{word:String,url:String,yellow:Boolean,black:Boolean}]}],
    state:{type:String},
    event_type:{type:String},
    image_url:{type:String},
    status:{type:Boolean}
})


const articleModel=mongoose.model("article",articleSchema)

module.exports={articleModel}