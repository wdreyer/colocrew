const mongoose = require('mongoose');

const campsSchema = mongoose.Schema({
    title : String, 
    idRecruiter : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    photos : Array,
    startDate : Date,
    endDate : Date,
    description : String,
    lodgingtype : [{ type: mongoose.Schema.Types.ObjectId, ref: 'lodgings' }],
    location : String,
    activities : [{ type: mongoose.Schema.Types.ObjectId, ref: 'activities'  }],
    learningGoals : [{ type: mongoose.Schema.Types.ObjectId, ref: 'learninggoals' }],
    salaryseType : String,
    salary: Number,
    contractType : String,
    salaryPeriod : String,
    isActive : { type : Boolean, default: true},
    isArchived : { type : Boolean, default: false}, 
    likes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'users'  }],
    dislikes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'users'  }],
    childNumber: Number,
    animNumber: Number,

    
})

const Camp = mongoose.model('camps', campsSchema);

module.exports = Camp;