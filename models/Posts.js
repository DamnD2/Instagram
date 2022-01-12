const { Schema, model } = require('mongoose');

const Posts = new Schema({
  posts: [{
    description: { type: String, default: '' },
    img: { type: String },
  }],
});

module.exports = model('Posts', Posts);