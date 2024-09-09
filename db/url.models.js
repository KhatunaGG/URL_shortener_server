const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const urlSchema = new Schema({
    url: {
        type: String,
        require: true
    },
    shortCode: String,
    createdAt: String,
    updatedAt: String,
    accessCount: Number
})

module.exports = mongoose.model('url', urlSchema)