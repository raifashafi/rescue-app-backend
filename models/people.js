const mongoose=require("mongoose")
const peopleSchema=mongoose.Schema(
    {
        fullname:String,
        phone:String,
        village:String,
        place:String,
        houseno:String,
        pincode:String,
        missingdate:String,
        aadharno:String,
        gender:String,
        age:String
    }
)
const PeopleModel=mongoose.model("peoples",peopleSchema)
module.exports=PeopleModel