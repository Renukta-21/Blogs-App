const { request } = require("../app")
const jwt = require('jsonwebtoken')
const User = require("../models/user")

const logger = (req, res, next) => {
  if (req.url !== 'favico.ico' && process.env.NODE_ENV !== 'test') {
    console.log(`${req.method} ----- ${req.url}`)
  }
  next()
}

const errorHandler = (err, req, res, next) => {
  console.log(err)
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.code === 11000) {
    return res.status(409).json({ error: 'Username already taken' })
  }else if(err.name=== 'JsonWebTokenError'){
    return res.status(401).json({error: err.message})
  }else if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID format',
      message: `The field "${err.path}" must be a valid ObjectId.`,
    });
}}

const useExtractor = async (req, res, next) => {
    const authorization = req.get('Authorization');
    
    if (authorization && authorization.startsWith('Bearer')) {
        req.token = authorization.replace('Bearer ', '');
            try{
                const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET_KEY)
                req.user = await User.findById(decodedToken.id)
                if (!req.user) {
                    return res.status(404).json({ error: 'User not found' }); // Protección adicional
                }
            }catch(error){
                next(error)
            }
        }else {
            return res.status(401).json({ error: 'Authorization header missing or malformed' });
        }
next()
}

module.exports = {
  logger,
  errorHandler,
  useExtractor,
}
