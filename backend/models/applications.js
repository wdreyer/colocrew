const mongoose = require('mongoose');

const applicationsSchema = mongoose.Schema({
     
    idCandidate : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    startDate : Date,
    endDate : Date,
    title : String,
    description : String,
    lodgingType : Array,
    locations : Array,
    activities : Array,
    learningGoals : Array,
    salariesType : String,
    salarie: Number,
    contractType : Array,
    salariePeriod : Array,
    isActive : { type : Boolean, default: true},
    isArchived : { type : Boolean, default: false}, 
    likes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'users'  }],
    dislikes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'users'  }],
    
})

const Application = mongoose.model('applications', applicationsSchema);

module.exports = Application;