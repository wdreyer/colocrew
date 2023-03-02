const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    street: String,
    city: String,
    zipcode : String,
    country : String,
   });

   const userSchema = mongoose.Schema({
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    token: { type: String, default: '' },
    name: { type: String, default: '' },
    surname: { type: String, default: '' },
    uid: { type: String, default: '' },
    address: { type: addressSchema, default: {} },
    phone: { type: String, default: '' },
    gender: { type: String, default: '' },
    birthDate: { type: Date, default: null },
    description: { type: String, default: '' },
    photos: { type: String, default: '' },
    qualifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'qualifications' }],
    isCandidate: { type: Boolean, default: false },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'applications' }],
    isRecruiter: { type: Boolean, default: false },
    camps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'camps' }],
  });

const User = mongoose.model('users', userSchema);

module.exports = User;