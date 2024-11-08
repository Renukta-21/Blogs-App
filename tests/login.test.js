const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

const newUser = {
  username: 'DanielRamirezDevian',
  password: 'danielUrbina',
}
let token
beforeEach(async () => {
  await User.deleteMany({})

  await api.post('/api/users').send(newUser).expect(201)
  const response = await api.post('/api/login').send(newUser).expect(200)
  token = response.body.token
})

test('new user succefully added ', async () => {
  const response = await api
    .get('/api/users')
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, 1)
  assert.strictEqual(response.body[0].username, newUser.username)
})
test('token inmutates', async()=>{
  await api.get('/api/blogs')
})

after(async () => {
  mongoose.connection.close()
})
