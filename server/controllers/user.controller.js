const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { use } = require("../routes/user.route.js");
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const secret = process.env.SECRET

const getRegister = (req, res) => {
  console.log("Register page");
  res.send("Register Page");
};

const postRegister = async(req,res)=>{
  try {
    const {password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    const user = new userModel({...req.body, password: hashPassword})
    await user.save()
    console.log(user);
    sendMail(req,res)
    
  } catch (error) {
    console.log(error);
    
  }
}

const postLogin = async(req,res)=>{
  try {
    const {email, password} = req.body
    const userInfo = await userModel.findOne({email})
    if(!userInfo){
      console.log("User not found");
      res.status(400).json({message: "User not found"})
    }
    const comparePassword = await bcrypt.compare(password, userInfo.password)
    if(!comparePassword){
      console.log("Incorrect password");
      
    }
    else{
      const token = jwt.sign({userInfo:userInfo.id, email}, secret, {expiresIn: "5m"})
      // console.log(token);
      res.status(200).json({
      message: "User signed in successfully",
      status: true,
      token: token
    })
    }
    
    
  } catch (error) {
    console.log(error);
    
  }
}

const getDashboard = (req,res) => {
  userModel.find().then((data)=>{
      res.send({ data: data})
  })
  .catch((err)=>{
      console.log(err);
  })
}

const getVerify = (req,res)=>{
  const token = req.headers.authorization.split(" ")[1]

  jwt.verify(token, secret, (err, result)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      return res.status(201).json({
        message: "User checked",
        status: true,
        user: result
      })
      
    }
  })
}

const generateTrackingNumber = (req,res) => {
  const track = 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase();
  console.log(track);
  return res.status(201).json({
    message: "Tracking number created",
    status: true,
    tracking_number: track
  })
};

const sendMail = (req,res) =>{
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  let template = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration Successful</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .card {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      text-align: center;
    }
    h1 {
      color: #2e86de;
    }
    p {
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Registration Successful!</h1>
    <p>Welcome, <span id="userEmail">Loading...</span></p>
  </div>
</body>
</html>
`

let mailOption = {
  from: process.env.EMAIL,
  to: "iamlegendarium@gmail.com",
  subject: "Hey",
  text: "Today",
  html: template
}
transporter.sendMail(mailOption).then((info)=>{
  console.log(info);
  return res.status(200).json({message: "Email successfully sent"})
})
.catch((error)=>{
  console.log(error);
  
})
}
module.exports = { getRegister, postRegister, postLogin, getVerify, generateTrackingNumber, sendMail};
