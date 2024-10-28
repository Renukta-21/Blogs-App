const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    name:String,
    passwordHash:String
})

const User = new mongoose.model('user', userSchema)
