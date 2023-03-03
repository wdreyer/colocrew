const mongoose = require('mongoose');

const applicationsSchema = mongoose.Schema({
    title : String, 
    idCandidate : { type: mongoose.Schema.Users.ObjectId, ref: 'users' },
    stardDate : Date,
    endDate : Date,
    description : String,
    lodgingtype : [{ type: mongoose.Schema.Lodging.ObjectId, ref: 'lodgings' }],
    location : String,
    activities : [{ type: mongoose.Schema.LearningGoals.ObjectId, ref: 'activities'  }],
    learningGoals : [{ type: mongoose.Schema.LearningGoals.ObjectId, ref: 'learninggoals' }],
    salaryseType : String,
    salary: Number,
    contractType : Array,
    salaryPeriod : String,
    isActive : { type : Boolean, default: true},
    isArchived : { type : Boolean, default: false}, 
    likes : [{ type: mongoose.Schema.Users.ObjectId, ref: 'users'  }],
    dislikes : [{ type: mongoose.Schema.Users.ObjectId, ref: 'users'  }],
    
})

const Application = mongoose.model('applications', applicationsSchema);

module.exports = Application;