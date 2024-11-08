const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

const newUser = {
  username: 'DanielRamirez',
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

test('Correct blog number are returned correctly', async () => {
  console.log(token)
  const newBlog = {
    title: 'Nuevo Blog',
    author: 'Autor Prueba',
    url: 'http://nuevo-blog.com',
    likes: 10,
  }

  // Enviar solicitud POST con el token de autorización
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`) // Agrega el token en el encabezado
    .send(newBlog)
    .expect(201) // Espera que la respuesta sea 201 "Created"
})

after(async () => {
  mongoose.connection.close()
})
