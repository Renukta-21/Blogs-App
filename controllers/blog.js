const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(req,res) => {
    const blogs = await Blog.find({})
    res.send(blogs)
})
blogsRouter.post('/', async(req,res) => {
    const newBlog = new Blog(req.body)
    console.log(newBlog)
    const savedBlog = await newBlog.save()
    res.status(201).send(savedBlog)
})
module.exports = blogsRouter