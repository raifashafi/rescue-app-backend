const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const loginModel = require("./models/admin")
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://raifashafi:raifashafi@cluster0.tznb7.mongodb.net/resueDB?retryWrites=true&w=majority&appName=Cluster0")

app.get("/test", (req, res) => {
    res.json({ "status": "success" })
})
//ADMINSIGNUP
app.post("/adminSignup", (req, res) => {
    let input = req.body
    let hashedpassword = bcrypt.hashSync(input.password, 10)
    //console.log(hashedpassword)
    input.password = hashedpassword//newpassword is stored in hashedpassword
    console.log(input)
    let result = new loginModel(input)
    result.save()//it will store
    res.json({ "status": "success" })
})


app.listen(3030, () => {
    console.log("server started")
})