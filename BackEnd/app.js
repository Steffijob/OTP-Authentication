const express = require('express')

const mongoose = require('mongoose')
const cors = require('cors')
const nodemailer = require("nodemailer");
const Data = require('./UserModel')
const path = require('path');

const PORT = process.env.PORT || 3000


const app = new express();
app.use(cors())
app.use(express.json({urlencoded:true}));


app.post('/api/email',(req,res)=>{
 res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Method:GET,POST,PUT,DELETE")
 const randomPin = Math.floor(1000 + Math.random() * 9000);
 var data ={
  email : req.body.email,
  otp:randomPin
 }
 var authdb = new Data(data)
 authdb.save().then((data)=>{

  var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
       user: 'abcd@gmail.com',
       pass: 'sdfdgfhh'
   }
});

var mailOptions = {
   from: 'abcd@gmail.com',
   to: data.email,
   subject: 'OTP',
   text: `OTP is ${data.otp}`

};

transporter.sendMail(mailOptions, function(error, info){
   if(error){
       console.log(error);
   } else {
       console.log('email send:'+info.response);
   }
});
  
  console.log(data)
 res.send(data)
 }
  )

})

app.post('/api/otp',(req,res)=>{
  var data = {
    email:req.body.email,
    otp:req.body.otp
}


Data.findOne({email:data.email,otp:data.otp}).then((data)=>{
 if (data != null ){
  console.log("otp verify",data)
  res.send(data)
 }
 else{
res.send(null)
 }
 
})
})



app.listen(PORT,()=>{
 console.log(`PORT is running on ${PORT}`)
})
