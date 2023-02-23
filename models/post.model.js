const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  create_time: {
    type: Date,
    required: true,
  },
  update_time: {
    type: Date,
  },
}, {
  timestamps: false,
})

postSchema.pre('save', function (next) {
  this.update_time = this.create_time

  next()
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
