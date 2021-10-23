import mongoose from 'mongoose'
const {Schema} = mongoose
import Tree from './Tree'

module.exports = new Schema({
    Id: Number,
    Genus_Latin: String,
    Name_Latin: String,
    Genus_Danish: String,
    Name_Danish: String,
    Trees: [Tree]
})
