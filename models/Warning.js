import mongoose from 'mongoose'
const {Schema} = mongoose

module.exports = new Schema({
    Id: Number,
    Type: String,
    Content: String,
    Active: Boolean
})
