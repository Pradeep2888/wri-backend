const express=require("express")
const cors=require("cors")
const { connection } = require("./config/db")
const { loginRoute } = require("./routes/login.route")
const { requestRoute } = require("./routes/request.route")
const { eventRoute } = require("./routes/event.route")
const { articleRoute } = require("./routes/artical.route")
const { publicationRoute } = require("./routes/publication.route")
const { aws } = require("./config/aws")
require("dotenv").config()


const app=express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));



app.get("/",(req,res)=>{
    res.send({message:"welcome to homepage"})
})

app.use("/login",loginRoute)
app.use("/request",requestRoute)
app.use("/event",eventRoute)
app.use("/article",articleRoute)
app.use("/publication",publicationRoute)




app.listen(8000,async()=>{
    try{
      await connection
      // await aws
      console.log("connected with DB")
    }
    catch (err) {
      console.log("Error on connecting DB")
      console.log(err)
    }
    console.log("Port is connected with 8000")
})