const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();
const mongoose=require('mongoose');
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlparser: true});
const Userschema= {
  email: String,
  password: String,
};
const User=mongoose.model("User",Userschema);
app.get("/",function(req,res){
  res.render("home");
});
app.get("/login",function(req,res){
  res.render("login");
});
app.get("/register",function(req,res){
  res.render("register");
});
app.get("/secrets",function(req,res){
  res.render("secrets");
})
app.post("/register",function(req,res){
  const Customer=new User({
    email:req.body.username,
    password:req.body.password,
  });
  Customer.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.render("secrets");
    }

  });
});
app.post("/login",function(res,req){
   const username= req.body.username;
   const password= req.body.password;
   User.findOne({email: username},function(err,foundUser){
     if(err){
       console.log(err);
     } else{
       if(foundUser){
         if(foundUser.password==password) {
           res.render("secrets");
         }
       }
     }
   });
 });
app.post("/secrets",function(req,res){
  res.render("home");
});
app.listen("3000",function(){
  console.log("server is running");
});
