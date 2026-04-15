const mongoose = require('mongoose')

async function connectDb() {
  if (!process.env.MONGO_URI) {
    console.log('missing MONGO_URI in .env')
    process.exit(1)
  }
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('mongo connected')
  } catch (err) {
    console.log('mongo error', err.message)
    process.exit(1)
  }
}

module.exports = connectDb
