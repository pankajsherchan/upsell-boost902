const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  roleId: { type: mongoose.Types.ObjectId, required: true, ref: 'Role' },
  phone: { type: String, required: false }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
