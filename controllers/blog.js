const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.send(blogs)
})
blogsRouter.post('/', async (req, res) => {
    const user = await User.findById(req.body.userId)

    if (req.body.title && req.body.author && req.body.url) {
        let newBlog = new Blog({
            ...req.body,
            likes: req.body.likes === undefined ? 0 : req.body.likes,
            user: req.body.userId
        })
        const savedBlog = await newBlog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        res.status(201).send(savedBlog)
    } else {
        res.status(400).send({ error: 'Required fileds not sent' })
    }
})

blogsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findByIdAndDelete(id)
    if (blog) {
        res.status(204).end()
    } else {
        res.status(404).end()
    }

})

blogsRouter.put('/:id',async (req,res)=>{
    console.log(req.body)
    const {id} = req.params
    const updatedBlog = req.body
    const blog = await Blog.findByIdAndUpdate(id, updatedBlog, {new:true})
    if(blog){
        res.status(200).send(blog)
    }else{
        res.status(404).send({error:'Blog not found'})
    }
})

module.exports = blogsRouter