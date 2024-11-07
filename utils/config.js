require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT
const TEST_MONGO_URI = process.env.TEST_MONGO_URI
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

module.exports={
    MONGO_URI, PORT, TEST_MONGO_URI, JWT_SECRET_KEY
}