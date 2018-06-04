const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  nameID: String,
  nameIDFormat: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
