const express = require("express");

const todoRoute = require('./src/Routes/route.js');
const dotenv = require('dotenv')
const connectDB = require('./src/models/DB.models')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')


const app = express();

app.use(bodyParser.urlencoded({extended:true}))

dotenv.config({path: 'config.env'})

// mogoDB connection
connectDB();

// log requests
app.use(morgan('tiny'));


app.use(todoRoute)


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: process.env.RECIPIENT,
    subject: "Nodemailer Project",
    text: "This is a test mail from my todo app to be sure that this node mailer is functioning."
  }

  transporter.sendMail(mailOptions, (err,data)=>{
    if(err){
        console.log("Error:" + err)
    }else{
        console.log("Email sent successfully");
    }
  })

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`The server is running on port ${PORT}`))
