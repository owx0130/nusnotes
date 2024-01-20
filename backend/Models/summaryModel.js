import mongoose from "mongoose";

const Schema = mongoose.Schema

const summarySchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    topic:{
        type: String,
        required:true
    },
    embedID:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Summary', summarySchema)