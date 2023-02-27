const mongoose = require('mongoose');

const qualificationsSchema = mongoose.Schema({
name : String,
});

const Qualification = mongoose.model('qualifications', qualificationsSchema);

module.exports = Qualification;