const express = require("express");

const todoRoute = require('./src/Routes/route.js');
const dotenv = require('dotenv')
const connectDB = require('./src/models/DB.models')
const morgan = require('morgan');
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.urlencoded({extended:true}))

dotenv.config({path: 'config.env'})

// mogoDB connection
connectDB();

// log requests
app.use(morgan('tiny'));


app.use(todoRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`The server is running on port ${PORT}`))
