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
app.post("/adminSignin",(req,res)=>{
    let input=req.body
    let result=loginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    res.json({ "status": "success" })
                } else {
                    res.json({ "status": "wrong password" })
                }
            } else {
                res.json({ "status": "username doesnt exist" })
            }
        }
    ).catch()
})

app.listen(3030, () => {
    console.log("server started")
})