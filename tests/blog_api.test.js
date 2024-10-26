const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'El hombre que no vive',
    author: 'Daniel Urbina',
    url: 'fdfjdfhksdfjfd',
    likes: 31,
  },
  {
    title: 'El hombre que no vive',
    author: 'Daniel Urbina',
    url: 'fdfjdfhksdfjfd',
    likes: 31,
  },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogPromises = initialBlogs.map(b => {
      const newBlog = new Blog(b)
      return newBlog.save()
    })
    await Promise.all(blogPromises)
  })
  

/* test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('First Blog is by Daniel Urbina',async()=>{
    const response = await api.get('/api/blogs')

    const authors = response.body.map(b=> b.author)
    assert(authors.includes('Daniel Urbina'))
}) */

test('An valid Blog obj can be added', async()=>{
  const newBlog = {
    title: 'La calistenia como modelo del hombre',
    author: 'Pablo Zuckerberg',
    url: 'dsgvasdhjvasd',
    likes: 200,
  }

  await api.post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const authors = response.body.map(b=> b.author)

  assert(authors.includes('Pablo Zuckerberg'))
  assert.strictEqual(response.body.length, initialBlogs.length + 1)

})

test('Blog without content is not added',async ()=>{
  const newBlog = {

  }
  return api.post('/api/blogs')
  .expect
})

after(() => {
  mongoose.connection.close()
})
