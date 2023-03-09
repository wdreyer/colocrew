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
    console.log("START DATE VERS DB", req.body.startDate);
    console.log("END DATE VERS DB", req.body.endDate);
    if (req.body.startDate && req.body.endDate) {
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

router.get("/getApplicationsByUserCompatible/:id", async (req, res, next) => {
    try {
        const user = await Users.findById(req.params.id).populate(
            "camps"
        );
        let campsDates = [];
        let applicationsCompatible = [];

        for (let item of user.camps) {
            campsDates.push({
                startDate: item.startDate,
                endDate: item.endDate,
            });
            
            const compatibleApplications = await Applications.find({
                startDate: { $lte: item.startDate },
                endDate: { $gte: item.endDate },
            });
            if (compatibleApplications.length > 0) {
                applicationsCompatible.push(compatibleApplications[0]);
            }
        }
        res.json({ result: true, data: applicationsCompatible });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
