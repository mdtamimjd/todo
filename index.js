const express = require("express")
const app = express();
const path = require("path")
const cookieParser = require("cookie-parser");

// requre package
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// models
let userModel = require("./models/userModel");
const { error } = require("console");

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())




// route
app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/profile",isLoggedeIn,async (req,res)=>{
    let findUser = await userModel.findOne({email: req.data.email})
    res.render("profile",{user:findUser})

})

app.post("/registerAccount",async (req,res)=>{
    let {fullname,dob,email,password} = req.body;
    let checkEmail = await userModel.findOne({email})
    if(fullname.length < 3 || !isNaN(fullname)){
        res.redirect("/")
    } else if(checkEmail){
        res.redirect("/")
    }
    else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt,async function(err, hash) {
                let createUser = await userModel.create({
                    fullname,
                    dob,
                    email,
                    password:hash
                })
                res.redirect("/")
            });
        });
    }

})

// login route
app.post("/loginAccount",async(req,res)=>{
    let {emailLogin,passwordLogin} = req.body;
    let checkUser = await userModel.findOne({email:emailLogin});
    if(!checkUser){
        res.redirect("/")
    }
   else{
    bcrypt.compare(passwordLogin, checkUser.password , function(err, result) {
        if(err){ 
            console.log(error(err))
            res.redirect("/")
        }
        if(result){
            let token = jwt.sign({ email:emailLogin }, 'secret');
            res.cookie("token",token)
            res.redirect("/profile")
        }
        else{
            res.redirect("/")
        }
    });
   }
})

function isLoggedeIn(req,res,next){
    if(req.cookies.token === ''){
        return res.redirect("/");
    }
    jwt.verify(req.cookies.token, 'secret', function(err, user) {
        if(err){
            console.log(error(err))
        }else{
        req.data = user;
    }
    next();
    });
}

app.get("/logout",(req,res)=>{
    res.cookie("token",'')
    res.redirect("/")
})


app.listen(3000,()=>{
    console.log("server is running on the port",3000)
}) 