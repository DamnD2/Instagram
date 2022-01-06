const { Schema, model } = require('mongoose');

const User = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique:true, required: true },
  password: { type: String, required: true },
  age: { type: String },
  phone: { type: String },
  photo: { type: String },
  color: { type: String },
  description: { type: String },
});

module.exports = model('User', User);