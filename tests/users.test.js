/* const {test, describe, after, before} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const User = require('../models/user')
const api = supertest(app)
const bcrypt = require('bcrypt')

beforeEach(async()=>{
    await User.deleteMany({})
    const firstUser = {
        "username": "DaniUM",
        "password": "danielUrbina",
        "name": "Edward Smith"
    }
    await api
    .post('/api/users')
    .send(firstUser)
    .expect(201)
})

describe('User creation API ', ()=>{
    test('returns error when password is too short', async()=>{
        const invalidPassword = {
            "username": "DaniUM",
            "password": "dan",
            "name": "Edward Smith"
        }

        await api
        .post('/api/users')
        .send(invalidPassword)
        .expect(400)
    })
    test('insertion fails if username already exists', async()=>{
        const usernameAlExists = {
            "username": "DaniUM",
            "password": "daniel323",
            "name": "Edward Smith"
        }
        const response = await api
        .post('/api/users')
        .send(usernameAlExists)
        .expect(409)
    })

    test('fails when username empty', async()=>{
        const emptyUsername = {
            "password": "daniel323",
            "name": "Edward Smith"
        }

        await api
        .post('/api/users')
        .send(emptyUsername)
        .expect(400)
    })
})

after(async()=>{
    mongoose.connection.close()
}) */