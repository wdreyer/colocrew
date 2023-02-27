const mongoose = require('mongoose');

const activitiesSchema = mongoose.Schema({
name : String,
});

const Activity = mongoose.model('activities', activitiesSchema);

module.exports = Activity;