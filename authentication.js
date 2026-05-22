const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session=require('express-session');
const MongoStore=require("connect-mongo").default;
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
  
app.use(express.urlencoded({ extended: true }));
//!Set the view engine
app.set("view engine", "ejs");
app.use(cookieParser());

//?----Custom middleware----

const isAuthenticated=(req,res,next)=>{
  const userDataCookies=req.cookies.userData;
  try{
const username=req.session.userData?req.session.userData.username:null;
if(username){

return next();

}else{
  res.redirect("/login")
}
  
  }catch(err){
console.log(err.message)
  }
  
}

//isAdmin Auth
const isAdmin=(req,res,next)=>{
  const admin=req?.session?.userData?.role==="admin";
  if(admin){
return next();
  }
  else{
    res.send("Forbidden: you  don't have access")
  }

}
//!configure express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl:
        "mongodb://ifra00231_db_user:FL3KmjVBfxlzfa62@ac-vpuxiau-shard-00-00.vifglsr.mongodb.net:27017,ac-vpuxiau-shard-00-01.vifglsr.mongodb.net:27017,ac-vpuxiau-shard-00-02.vifglsr.mongodb.net:27017/db-authen?ssl=true&replicaSet=atlas-13h742-shard-0&authSource=admin&appName=Cluster0",
    }),
  }),
);
  

//Home Route
app.get("/", (req, res) => {
  console.log(req.session)
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
 req.session.userData={
  username:userFound.username,
  role:userFound.role
 }, 
res.redirect("/dashboard")
  }

  else{
    res.send("Invalid, login credentials")
  }
});

//Dashboard Route
app.get("/dashboard",isAuthenticated, (req, res) => {
  //! Grab the user from the cookie
  const username = req.session.userData
    ? req.session.userData.username
    : null;
  //! Render the template
  
    res.render("dashboard", { username });
  
});

//Logout Route
app.get("/logout", (req, res) => {
  //!Logout
  req.session.destroy();
  //redirect
  res.redirect("/login");
});

//start the server
app.listen(3000, console.log("The server is running"));