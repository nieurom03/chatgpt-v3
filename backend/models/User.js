const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {type: String},
  phone: {type: String},
  email: {type: String},
  createdAt: { type: Date, default: Date.now },
  picture: {type: String},
  given_name: {type: String},
  family_name: {type: String},
  payload: {type: Object}
})
const User =  mongoose.model('User', UserSchema)
module.exports = User;