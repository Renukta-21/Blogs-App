const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { default: mongoose } = require('mongoose')
const api = supertest(app)

const initialBlogs = [
  {
    "title": "El hombre que no vive",
    "author": "Daniel Urbina",
    "url": "fdfjdfhksdfjfd",
    "likes": 31,
  },
  {
    "title": "El hombre que si vive",
    "author": "Daniel Urbina",
    "url": "fdfjdfhksdfjfd",
    "likes": 31,
  }
]

beforeEach(async()=>{
  await Blog.deleteMany({})
  let newBlog = new Blog(initialBlogs[0])
  await newBlog.save()

  newBlog = new Blog(initialBlogs[1])
  await newBlog.save()
})

test('Correct blog number are returned correctly', async () => {
  const newBlog ={
    "title": "El hombre que quiere vivir",
    "author": "Eduardo Martinez",
    "url": "jdashsdsdha",
    "likes": 90,
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)

    const returnedBlogs = await 
    api.get('/api/blogs')
    .expect(200)
    assert.strictEqual(returnedBlogs.body.length, initialBlogs.length +1)
    
    
})


test('DB id field is correctly formatted', async()=>{
  const content = await api.get('/api/blogs')
  .expect(200)
  .expect('Content-Type',/application\/json/)

  const blogs = content.body
  blogs.forEach(b=>{
    assert.ok(b.id)
    assert.strictEqual(b._id, undefined)
  })

})

test('An new Blog object is added', async()=>{
  const newBlog = {
    "title": "El hombre que va a vivir",
    "author": "Edward Urbina",
    "url": "sdndbsdnsabsda",
    "likes": 21,
  }

  const response = await 
  api.post('/api/blogs')
  .send(newBlog)

  const blogs = await 
  api.get('/api/blogs')
  .expect(200)

  assert.strictEqual(blogs.body.length, initialBlogs.length+1)

})

test.only('Likes properties missing is filled w 0 ', async()=>{
  const newBlog = {
    "title": "El hombre que se fue a morir xd",
    "author": "Daniel Mtz",
    "url": "sdndbsdnsabsda",
  }

  const response = await 
  api.post('/api/blogs')
  .send(newBlog)
  .expect(201)

  console.log(response.body)
  assert.strictEqual(response.body.likes, 0)
})

test('Missing required fields on post',async()=>{
  
})
after(async()=>{
  mongoose.connection.close()
})