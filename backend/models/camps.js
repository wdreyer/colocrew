const mongoose = require('mongoose');

const campsSchema = mongoose.Schema({
    title : String, 
    idRecruiter : { type: mongoose.Schema.Users.ObjectId, ref: 'users' },
    photos : Array,
    stardDate : Date,
    endDate : Date,
    description : String,
    lodgingtype : [{ type: mongoose.Schema.Lodging.ObjectId, ref: 'lodgings' }],
    location : String,
    activities : [{ type: mongoose.Schema.LearningGoals.ObjectId, ref: 'activities'  }],
    learningGoals : [{ type: mongoose.Schema.LearningGoals.ObjectId, ref: 'learninggoals' }],
    salaryseType : String,
    salary: Number,
    contractType : String,
    salaryPeriod : String,
    isActive : { type : Boolean, default: true},
    isArchived : { type : Boolean, default: false}, 
    likes : [{ type: mongoose.Schema.Users.ObjectId, ref: 'users'  }],
    dislikes : [{ type: mongoose.Schema.Users.ObjectId, ref: 'users'  }],
    
})

const Camp = mongoose.model('camps', campsSchema);

module.exports = Camp;