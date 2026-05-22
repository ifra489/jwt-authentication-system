const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const jwt=require("jsonwebtoken");

const app = express();
require("dotenv").config();

//!Middlewares
//connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));


  const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    role:{
      type: String,
      default: "user",
  }
});
  const User=mongoose.model("User",userSchema);
  //!middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
//!Set the view engine
app.set("view engine", "ejs");

//?----Custom middleware----

 const isAuthenticated=(req,res,next)=>{
  const token=req.cookies?req.cookies.token:null;
  if(!token){
    return res.redirect("/login")
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.redirect("/login");
    req.userData = decoded;
    next();
  });
 }
  
// }

//isAdmin Auth
const isAdmin=(req,res,next)=>{
   if (req.userData?.role === "admin") {
     return next();
   }
   return res.status(403).send("Forbidden: Admins only");
}



//Home Route
app.get("/", (req, res) => {
 
  res.render("home");
});
//Login Route (login form)
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/admin-only",isAuthenticated,isAdmin, (req, res) => {
  res.render("admin");
});
//register
app.get("/register", (req, res) => {
  res.render("register");
});
//register
app.post("/register", async(req, res) => {
  const { username, password } = req.body;
const hashedPassword=await bcrypt.hash(password,10)
  const newUser=await User.create({
    username,
    password:hashedPassword
  })
  res.redirect("/login");
});
//Login Route logic
app.post("/login",async  (req, res) => {
  //!. Find the user login in the database
  const { username, password } = req.body;

  const userFound=await User.findOne({
    username
  })
 
  if(userFound && (await bcrypt.compare(password,userFound.password))){
    //!Generate token
    const token = jwt.sign(
      {
        username: userFound.username,
        role: userFound.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      },
    );
    console.log(token);
    console.log(req.cookies)
    res.cookie("token",token,{
      maxAge:3*24*60*60*1000,
      httpOnly:true
    })
res.redirect("/dashboard")
  }

  else{
    res.send("Invalid, login credentials")
  }
});

//Dashboard Route
app.get("/dashboard",isAuthenticated, (req, res) => {
  //! Grab the user from the cookie
  const username = req.userData?req.userData.username:null;
  //! Render the template
  if(username){
    res.render("dashboard", { username });
  }
  else{
    res.redirect("/login")
  }
  
});

//Logout Route
app.get("/logout", (req, res) => {
  //!Logout
  res.clearCookie("token");
  //redirect
  res.redirect("/login");
});

//start the server
app.listen(3000, console.log("The server is running"));