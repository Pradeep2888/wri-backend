const mongoose=require("mongoose")





const remarkSchema = new mongoose.Schema({
    user_type:{ type: String },
    message: { type:String },
    time: { type:String }
  });
  





const requestSchema=new mongoose.Schema({
    "message":{type:String,require:true},
    "page":{type:String,require:true},
    "sub_page":{type:String},
    "page_url":{type:String},
    "verified":{type:String},
    "remark":[remarkSchema],
    "status":{type:String,require:true},
    "request_type":{type:String,require:true},
    "image":{type:String}
},{
    timestamps:true
})

const requestModel=mongoose.model("request",requestSchema)

module.exports={requestModel}