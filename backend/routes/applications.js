var express = require('express');
var router = express.Router();

const Activities = require("../models/activities");
const Lodgings = require("../models/lodgings");
const Qualifications = require("../models/qualifications");
const Contracts = require("../models/contracts");
const Applications = require("../models/applications");

router.post('/newApply', function(req, res, next) {
    if(req.body.startDate && req.body.endDate){
        const Apply = {
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            description : req.body.description,
            lodgingType : req.body.lodgingType,
            locations : req.body.locations,
            activities : req.body.activities,
            contractType : req.body.contractType,
        }

        const newApply = new Applications(Apply);
            newApply.save()
                .then(result => {
                        res.status(201).json({
                        message: "Candidature créée avec succès",
                        createdApplying: true,
                        applicationsList: Apply,
                    });
                    
                })
                .catch(err => {
                console.log(err); 
                res.status(500).json({
                    error: err
                });
                });
}
});

module.exports = router;