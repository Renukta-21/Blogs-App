const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blog')
const middleware =  require('./utils/middleware')

mongoose.connect(config.MONGO_URI)
.then(console.log('SuccesFull connection to mongoDB'))
.catch(err=> console.log('Unexpected error" '+ err))

app.use(cors())
app.use(express.json())
app.use(middleware.logger)
app.use('/api/blogs', blogsRouter)

const PORT = config.PORT || 3001 
app.listen(PORT, ()=>{
    console.log('server started on '+ PORT)
})