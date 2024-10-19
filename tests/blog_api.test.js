const {test, describe, after} = require('node:test')
const assert = require('node:assert')
const mongoose =  require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api= supertest(app)

test('Blogs are returned as json', ()=>{
    console.log('test entry')
     return api.get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('There are three blogs', ()=>{
    return api.get('/api/blogs') 
    .then(response=>{
        assert.strictEqual(response.body.length, 3)
    })
})

after(async()=>{
    await mongoose.connection.close()
})