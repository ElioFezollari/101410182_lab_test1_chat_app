const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4()
  },  
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createon: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
