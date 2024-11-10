const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
require('express-async-errors')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.send(blogs)
})

blogsRouter.post('/', middleware.useExtractor, async (req, res) => {
  const user = req.user
    let newBlog = new Blog({
      ...req.body,
      likes: req.body.likes,
      user: user._id,
    })
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).send(savedBlog)
})

blogsRouter.delete('/:id',  middleware.useExtractor,async (req, res) => {
  const {id} = req.params
  const user = req.user
  const blog = await Blog.findById(id)
  
  if(blog.user.toString() !== user.id){
    return res.status(403).send({error: 'You do not have permission to delete this blog'})
  }

  await Blog.findByIdAndDelete(id)
  res.status(204).end()

})

blogsRouter.put('/:id', middleware.useExtractor, async (req, res) => {
  const { id } = req.params
  const updatedBlog = req.body
  const blog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
  if (blog) {
    res.status(200).send(blog)
  } else {
    res.status(404).send({ error: 'Blog not found' })
  }
})

module.exports = blogsRouter
