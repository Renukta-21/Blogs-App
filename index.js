const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const Blog = require('./models/blog')

mongoose.connect(process.env.MONGO_URI)
.then(console.log('SuccesFull connection to mongoDB'))
.catch(err=> console.log('Unexpected error" '+ err))

app.use(cors())
app.use(express.json())
app.get('/api/blogs', (req,res) => {
    Blog.find({})
    .then(blogs=> res.send(blogs))
})
app.post('/api/blogs', (req,res) => {
    const newBlog = new Blog(req.body)
    console.log(newBlog)
    newBlog.save()
    .then(savedBlog=>{
        res.status(201).send(savedBlog)
    })
})


const PORT = config.PORT || 3001 
app.listen(PORT, ()=>{
    console.log('server started on '+ PORT)
})