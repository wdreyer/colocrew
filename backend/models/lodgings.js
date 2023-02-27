const mongoose = require('mongoose');

const lodgingsSchema = mongoose.Schema({
name : String,
});

const Lodging = mongoose.model('lodgings', lodgingsSchema);

module.exports = Lodging;