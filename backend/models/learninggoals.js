const mongoose = require('mongoose');

const learninggoalsSchema = mongoose.Schema({
name : String,
});

const LearningGoals = mongoose.model('learninggoals', learninggoalsSchema);

module.exports = LearningGoals;