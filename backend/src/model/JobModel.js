const mongoose = require('mongoose')
const express = require('express')

const JobSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true,
    },
    location:{
        type:String,
        required: true
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const JobModel = mongoose.model('Job',JobSchema)
module.exports = JobModel