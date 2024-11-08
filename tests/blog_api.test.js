const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { default: mongoose } = require('mongoose')
const User = require('../models/user')
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
    "author": "Eduardo Martinez",
    "url": "fdfjdfhksdfjfd",
    "likes": 43,
  }
]

let token
const newUser = {
    username: 'DanielRamirez',
    password: 'danielUrbina'
  }

beforeEach(async()=>{
  await Blog.deleteMany({})
  await User.deleteMany({})
  let newBlog = new Blog(initialBlogs[0])
  await newBlog.save()

  newBlog = new Blog(initialBlogs[1])
  await newBlog.save()

  await api
  .post('/api/users')
  .send(newUser)
  .expect(201)

  const response = await api
  .post('/api/login')
  .send(newUser)
  .expect(200)

  
  token= response.body.token
})

test('Correct blog number are returned correctly', async () => {
  console.log(token)
  const newBlog ={
    "title": "El hombre que quiere  mudar ",
    "author": "Eduardo Broquios",
    "url": "jhdahjasdbhsda7878das",
    "likes": 64,
  }
  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

    await api.get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    
})


/* test('DB id field is correctly formatted', async()=>{
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

test('Likes properties missing is filled w 0 ', async()=>{
  const newBlog = {
    "title": "El hombre que se fue a morir xd",
    "author": "Daniel Mtz",
    "url": "sdndbsdnsabsda",
  }

  const response = await 
  api.post('/api/blogs')
  .send(newBlog)
  .expect(201)

  assert.strictEqual(response.body.likes, 0)
})

test('Missing required fields on post',async()=>{
  const newBlog = {
    "title": "El hombre que se fue a morir xd",
    "author": "Daniel Mtz",
  } 

  await api.post('/api/blogs')
  .send(newBlog)
  .expect(400)
})

describe('Deletion of a blog',()=>{
  test('Succeds with code 204 if id is valid', async()=>{
    const response = await 
    api.get('/api/blogs')
    .expect(200)

    const blogs = response.body
    await 
    api.delete(`/api/blogs/${blogs[0].id}`)
    .expect(204)

  })

  test('fails with code 404 if doesnt exist',async()=>{
    const response = await
     api.get('/api/blogs')
     .expect(200)

     await 
     api.delete(`/api/blogs/671025e22572cd27076a3943`)
     .expect(404)
    
  })
})

describe.only('Updating an specific blog',()=>{
  test.only('server responds with 200 on succesful operation',async()=>{
    const updatedBlog = {
      "title": "El hombre que se actualiza solo xdd",
      "author": "Zuckerberg",
      "url": "jkdashjksdahkd",
      "likes": 90,
    }

    const blogs = await
     api.get('/api/blogs')
     .expect(200)

    await 
    api.put(`/api/blogs/${blogs.body[0].id}`)
    .send(updatedBlog)
    .expect(200)

  })

  test.only('Server responds 404 if blog doesnt exist', async()=>{
    const updatedBlog = {
      "title": "El hombre que no actualiza",
      "author": "nddsja",
      "url": "jkdashjksdahkd",
      "likes": 90,
    }

    const blogs = await
     api.get('/api/blogs')
     .expect(200)

     await 
     api.put(`/api/blogs/671025e22572cd27076a3943`)
     .send(updatedBlog)
     .expect(404)
  })
}) */
after(async()=>{
  await mongoose.connection.close()
})