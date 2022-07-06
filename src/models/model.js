const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: String
}, {
    timestamps: true
})

const todoDb = mongoose.model('userdb', schema)

module.exports= todoDb