const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const correctPasword =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && correctPasword)) {
    return res.status(401).send({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET_KEY)
  res.status(200).send({token, username: user.username, name: user.name})
})

module.exports = loginRouter
