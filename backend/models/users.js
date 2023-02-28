const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    street: String,
    city: String,
    zipcode : String,
    country : String,
   });

const userSchema = mongoose.Schema({
  mail: String,
  password: String,
  token: String,
  name: String,
  surname : String, 
  // address : addressSchema,
  phone : String,
  gender : String,
  birthDate : Date,
  description : String,
  photos : String,
  // qualifications : [{ type: mongoose.Schema.Types.ObjectId, ref: 'qualifications' }],
  // isCandidate : Boolean,
  // applications : [{ type: mongoose.Schema.Types.ObjectId, ref: 'applications' }],
  // isRecruiter : Boolean,
  // camps : [{ type: mongoose.Schema.Types.ObjectId, ref: 'camps' }],
});

const User = mongoose.model('users', userSchema);

module.exports = User;
