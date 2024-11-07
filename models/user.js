const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    minLength: 3,
    type:String,
    required: true,
    unique: true
  },
  passwordHash: {
    required: true,
    type:String
  },
  name: {
    type:String,
    minLength: 3
  },
  blogs:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Blog'
  }]
})
userSchema.set('toJSON',{
  transform:(doc, returnedObj)=>{
    returnedObj.id = returnedObj._id
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

const User = new mongoose.model('User', userSchema)


module.exports = User