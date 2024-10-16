const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req,res) => {
    Blog.find({})
    .then(blogs=> res.send(blogs))
})
blogsRouter.post('/', (req,res) => {
    const newBlog = new Blog(req.body)
    console.log(newBlog)
    newBlog.save()
    .then(savedBlog=>{
        res.status(201).send(savedBlog)
    })
})
module.exports = blogsRouter