const mongoose = require('mongoose');

const locationsSchema = mongoose.Schema({
name : String,
});

const Location = mongoose.model('locations', locationsSchema);

module.exports = Location;