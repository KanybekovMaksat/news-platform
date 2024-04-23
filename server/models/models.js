const mongoose = require('mongoose');
require('dotenv').config();
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const userShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  photo: {
    type: String,
    default:
      'https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg',
  },
  role: {
    type: String,
    default: 'USER',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const categoryShema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const newsShema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default:
      'https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg',
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const commentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  newsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News',
  },
  text: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userShema);
const Token = mongoose.model('Token', tokenSchema);
const Category = mongoose.model('Category', categoryShema);
const News = mongoose.model('News', newsShema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
  Token,
  User,
  Category,
  News,
  Comment,
};
