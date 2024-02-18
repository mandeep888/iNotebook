const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const fetchUser = require("../middleware/fetchUser")
const JWT_SECRET= "I AM PRO";

//ROUTE 1 : Create a user using post "/api/auth/": No login required
router.post('/createuser',[
    body('email' , "Enter a valid email").isEmail(),                     // validating
  body('password',"Password length must be atleast 5 characters").isLength({ min: 5 }),
  body('name' , "Name lenght must be atleast 4 characters").isLength({ min: 4 })
], async (req,res)=>{
    const errors = validationResult(req);   
    //If the credentials doesn't match the upper criteria then error will thrown 
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success , errors: errors.array() });
    } 

    try{
      // Checking whether User has same credentials if not Create a User
    let user = await User.findOne({email:req.body.email});
    let dupName = await User.findOne({name:req.body.name});
    
    if(user || dupName){
      return res.status(400).json({success , error: "Sorry a user with this username or email already exist"})
    }
    
    //create a new user
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email
      });

    const data = {
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
    success = true;
    console.log(authToken);
    res.json({success , authToken});
      // res.json({"hello": "hello"})   // FOR DEBUGGING
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error ");
    }
})

//ROUTE 2 : loging a user "/api/auth/login":  login required
router.post('/login',[
body('email' , "Enter a valid email").isEmail(),                     // validating
body('password',"Password cannot br blank").exists()  
], async (req,res)=>{
  const errors = validationResult(req);   
    //If the credentials doesn't match the upper criteria then error will thrown 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    //console.log(email,password);
    try{
      let success=false;
      let user = await User.findOne({email})    //Will find a user matching the email in DB by accessing "User" model
      if(!user){
        success=false;
        return res.status(400).json({success,error: "Please try to login with correct credentials"});
      }
      const passwordCompare = await bcrypt.compare(password,user.password);
     // console.log(user.password);
      if(!passwordCompare){
        success=false;
        return res.status(400).json({success,error: "Please try to login with correct credentials"});
      }
      const data = {
        user:{
          id : user.id 
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
    console.log(authToken);
    success=true;
    res.json({success,authToken})
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error ");
    }
})
//Route 3: GET login user details on post request localhost:/api/auth/getuser . Login required
router.post('/getuser',fetchUser, async (req,res)=>{
try{
  // console.log(req.user.id)
  const userID = req.user.id;
  const user = await User.findById(userID).select("-password");
  res.send(user);
}
catch(error){
  console.error(error.message);
  res.status(500).send("Internal server error ");
}
})
module.exports = router