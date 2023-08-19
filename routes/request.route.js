const express = require("express")
const { requestModel } = require("../models/RequestFormModel")
const requestRoute = express.Router()


requestRoute.get("/", async (req, res) => {
    const data = await requestModel.find()
    res.send({ data: data })
})

requestRoute.post("/addrequest", async (req, res) => {
    const { message, page, sub_page, page_url, status, request_type, verified, remark } = req.body



    try {
        const new_request = new requestModel({
            message,
            page,
            sub_page: sub_page ? sub_page : "",
            page_url: page_url ? page_url : "",
            status: "pending",
            request_type,
            verified: verified ? verified : "false",
            remark: remark ? remark :[]
        })
        // console.log(new_request)
        let result = await new_request.save()
        res.send({ msg: "request posted successfully" })
    }
    catch (err) {
        console.log(err)
        res.send({ msg: "request not posted successfully" })
    }

})


requestRoute.patch("/update/status/:id", async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    try {
        const updated = await requestModel.findByIdAndUpdate({ _id: id }, { "$set": { "status": status, } })
        res.send("status update successfully")
    }
    catch (err) {
        console.log(err)
        res.send(" status not update successfully")
    }



})


requestRoute.patch("/update/verified/:id", async (req, res) => {
    const { id } = req.params
    const { verified } = req.body
    try {
        const updated = await requestModel.findByIdAndUpdate({ _id: id }, { "$set": { "verified": verified === "false" ? "true" : "false" } })
        res.send("verified updated successfully")
    }
    catch (err) {
        console.log(err)
        res.send("verified not updated successfully")
    }


})




requestRoute.post("/update/remark/:id", async (req, res) => {
    const { id } = req.params
    const data = req.body
    let oldremark=await requestModel.findById({_id:id})
    let remarkarray=oldremark.remark
    remarkarray.push(data)

    console.log(remarkarray)

    try {
        const updated = await requestModel.findByIdAndUpdate({ _id: id }, { "$set": { "remark": remarkarray } })
        res.send("remark updated successfully")
    }
    catch (err) {
        console.log(err)
        res.send("remark not updated successfully")
    }


})



module.exports = { requestRoute }
