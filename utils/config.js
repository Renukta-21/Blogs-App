require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT
const TEST_MONGO_URI = process.env.TEST_MONGO_URI

module.exports={
    MONGO_URI, PORT, TEST_MONGO_URI
}