var express = require("express");
var router = express.Router();

const Activities = require("../models/activities");
const Lodgings = require("../models/lodgings");
const Qualifications = require("../models/qualifications");
const Contracts = require("../models/contracts");
const Applications = require("../models/applications");
const Users = require("../models/users");

router.post("/newApply", function (req, res, next) {
    const datePost = Date.now();
    console.log('START DATE VERS DB',req.body.startDate);
    console.log('END DATE VERS DB',req.body.endDate);
    if(req.body.startDate && req.body.endDate){
        const Apply = {
            idCandidate: req.body.idCandidate,
            datePost: datePost,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            description: req.body.description,
            lodgingType: req.body.lodgingType,
            locations: req.body.locations,
            activities: req.body.activities,
            contractType: req.body.contractType,
        };
        const newApply = new Applications(Apply);
        newApply.save().then((result) => {
            //console.log('RESULT RESULT : ',result);
            const storedApplying = result;
            Users.findOneAndUpdate(
                { _id: Apply.idCandidate },
                { $push: { applications: result._id } }
            ).then((data) => {
                if (data === null) {
                    return res.json({ result: false });
                } else {
                    res.status(200).json({
                        result: true,
                        message: "application successfully created",
                        storedResult: storedApplying,
                    });
                }
            });
        });
    }
});

router.get("/", (req, res, next) => {
    Applications.find()
        .populate("idCandidate")
        .then((data) => {
            if (data) {
                res.json({ result: true, data: data });
            } else {
                res.json({
                    result: false,
                });
            }
        });
});

router.get("/myApplications/:ID", function (req, res, next) {
    Users.find({ _id: req.params.ID })
        .populate("applications")
        .then((data) => {
            if (data === null) {
                return res.json({ result: false });
            } else {
                console.log(data[0].applications);
                res.status(200).json({
                    result: true,
                    message: "application successfully created",
                    result: data[0].applications,
                });
            }
        });
});

router.get("/displayCandidatesByDates", (req, res, next) => {
// 86 400 000
console.log(new Date(req.query.startDate).getTime())
    Applications.find({
        startDate: { $lte: new Date(req.query.startDate).getTime() },
        endDate: { $gte: new Date(req.query.endDate).getTime() },
    })
        .populate("idCandidate")
        .then((data) => {
            if (data) {
                res.json({ result: true, data: data });
            } else {
                res.json({
                    result: false,
                });
            }
        });
});

module.exports = router;
