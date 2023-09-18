const mongoose=require("mongoose")


const govtpublicationSchema=new mongoose.Schema({
    heading:{type:String},
    date:{type:String},
    discription:[{text:String,inputsAndCheckboxes:[{word:String,url:String,yellow:Boolean,black:Boolean}]}],
    report_url:{type:String},
    publisher:[],
    state:{type:String},
    publication_filter:{type:String},
    image_url:{type:String},
    status:{type:Boolean}
})


const govtpublicationModel=mongoose.model("govtpublication",govtpublicationSchema)

module.exports={govtpublicationModel}