const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const loginModel = require("./models/admin")
const PeopleModel = require("./models/people")

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
//ADMINSIGNIN
app.post("/adminSignin",(req,res)=>{
    let input=req.body
    let result=loginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                   jwt.sign({email:input.username},"rescue-app",{expiresIn:"4d"},
                    (error,token)=>{
                        if (error) {
                            res.json({ "status": "invalid authentication" })
                            
                        } else {
                            res.json({ "status": "success","token":token })
                        }
                    }
                   )
                } else {
                    res.json({ "status": "wrong password" })
                }
            } else {
                res.json({ "status": "username doesnt exist" })
            }
        }
    ).catch()
})
app.post("/addPeoples",(req,res)=>{
    let input=req.body
    let token=req.headers.token
    jwt.verify(token,"rescue-app",(error,decoded)=>{
        if (decoded && decoded.email) {
            let result=new PeopleModel(input)
            result.save()
            res.json({ "status": "registration successfull" })
        } else {
            res.json({ "status": "registration failed" })
        }
    })
})

app.listen(3030, () => {
    console.log("server started")
})