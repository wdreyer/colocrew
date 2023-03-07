const mongoose = require('mongoose');

const campsSchema = mongoose.Schema({
    title : String, 
    idRecruiter : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    photos : Array,
    startDate : Date,
    endDate : Date,
    description : String,
    location : String,
    lodgingtype :  Array,
    learningGoals : Array,
    activities: Array,
    salaryType : String,
    salary: Number,
    contractType : String,
    salaryPeriod : String,
    isActive : { type : Boolean, default: true},
    isArchived : { type : Boolean, default: false}, 
    likes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'users'  }],
    dislikes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'users'  }],
    childNumber: Number,
    animNumber: Number,
    datePost : Date,
})

const Camp = mongoose.model('camps', campsSchema);

module.exports = Camp;