const mongoose = require('mongoose');

const contractsSchema = mongoose.Schema({
types: Array,
period : Array,
taxes : Boolean,
minimalwage : Number,

});

const Contract = mongoose.model('contracts', contractsSchema);

module.exports = Contract;