const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
require('express-async-errors')
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  const { username, password, name } = req.body
  if(password.length < 8){
    return res.status(400).send({error:'Password must have at least 8 characters long'})
  }
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const newUser = new User({
    username,
    passwordHash,
    name,
  })

    await newUser.save()
    res.status(201).send(newUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  if (users) {
    return res.status(200).send(users)
  }
})
module.exports = usersRouter
