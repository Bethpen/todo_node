const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, `This serer is running on port ${PORT}`)

