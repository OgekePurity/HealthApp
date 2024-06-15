const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    match: /^\S+@\S+\.\S+$/, 
    validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
}
})

/* UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
}; */
// Custom validation for matching password
/* userSchema.path('matchpassword').validate(function(value) {
  return value === this.parent().password; // Your validation logic here
}, 'Passwords do not match'); */

module.exports = mongoose.model('User', userSchema);

