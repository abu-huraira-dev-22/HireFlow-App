const express = require('express')
const mongoose = require('mongoose')
const connectDb = require('./db/db')
const dotenv = require('dotenv').config()

const app = express()
app.use(express.json())


connectDb()


app.listen(3000,()=>{
    console.log('Server is running')
})