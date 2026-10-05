const mongoose = require('mongoose')

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI)
        console.log('Database is connected')
    } catch (error) {
        console.log('Database connection error:', error)
    }
}

module.exports = connectDb