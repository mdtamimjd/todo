const mongoose = require("mongoose");
;( async ()=>{
    try{
        await mongoose.connect("mongodb+srv://tamim:tamim123@cluster0.fe9fn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    } catch (error) {
        console.log("Error: ",error)
        throw error
    }
})()
const userModel = mongoose.Schema({
    fullname:String,
    dob:String,
    email:String,
    password: String
})
module.exports = mongoose.model("user",userModel)