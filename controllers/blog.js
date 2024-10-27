const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(req,res) => {
    const blogs = await Blog.find({})
    res.send(blogs)
})
blogsRouter.post('/', async(req,res) => {
    if(req.body.title && req.body.author && req.body.url){
        let newBlog = new Blog({
            ...req.body,
             likes: req.body.likes===undefined? 0 : req.body.likes})

        const savedBlog = await newBlog.save()
        res.status(201).send(savedBlog)
    }else{
        res.status(400).send({error:'Required fileds not sent'})
    }
})
module.exports = blogsRouter