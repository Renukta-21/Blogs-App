const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')

const connectionString =
  process.env.NODE_ENV === 'test'
    && config.MONGO_URI
    /* : config.TEST_MONGO_URI */

    console.log(connectionString)
mongoose
  .connect(connectionString)
  .then(console.log('SuccesFull connection to mongoDB'))
  .catch((err) => console.log('Unexpected error" ' + err))

app.use(cors())
app.use(express.json())
app.use(middleware.logger)
app.use('/api/blogs', blogsRouter)

module.exports = app