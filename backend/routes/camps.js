var express = require("express");
var router = express.Router();
const Camp = require("../models/camps");

router.post("/createCamp", (req, res, next) => {
    const {
        title,
        recruiterId,
        picture,
        startDate,
        endDate,
        description,
        lodgingType,
        location,
        activities,
    } = req.body;

    const camp = new Camp({
        title,
        recruiterId,
        picture,
        startDate,
        endDate,
        description,
        lodgingType,
        location,
        activities,
    });


    camp.save().then(res => {
        return res.status(200).json({
            result: true,
            message: "camp successfully created",
        });
    })
});


module.exports = router;
