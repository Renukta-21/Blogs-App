const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const connectionString =
  process.env.NODE_ENV === 'test' ?  config.TEST_MONGO_URI: config.MONGO_URI 

mongoose
  .connect(connectionString)
  .then(()=> console.log('SuccesFull connection to mongoDB '+ connectionString, process.env.NODE_ENV))
  .catch((err) => console.log('Unexpected error" ' + err))

app.use(cors())
app.use(express.json())
app.use(middleware.logger)
app.use('/api/blogs', middleware.useExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)
module.exports = app
