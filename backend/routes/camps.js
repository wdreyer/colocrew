var express = require("express");
var router = express.Router();
const Camp = require("../models/camps");
const { checkBody } = require("../modules/checkBody");

const uniqid = require("uniqid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

router.post("/createCamp", async (req, res) => {
    if (!checkBody(req.body, [
            "idRecruiter",
            "title",
            "location",
            "description",
            "salary",
            // "activities",
            // "lodgingtype",
            "startDate",
            "endDate",
            "childNumber",
            "animNumber",
        ])
    ) {
        res.json({ result: false, error: "Missing or empty fields" });
        return;
    }
    const {
        idRecruiter,
        title,
        location,
        description,
        salary,
        // activities,
        // lodgingtype,
        startDate,
        endDate,
        childNumber,
        animNumber,
    } = req.body;

    if (req.files) {
        const photoPath = `./tmp/${uniqid()}.jpg`;
        const resultMove = await req.files.photoFromFront.mv(photoPath);

        if (!resultMove) {
            const resultCloudinary = await cloudinary.uploader.upload(
                photoPath
            );
            fs.unlinkSync(photoPath);

            const camp = new Camp({
                idRecruiter,
                title,
                location,
                description,
                salary,
                // activities,
                photos: resultCloudinary.secure_url,
                // lodgingtype,
                startDate,
                endDate,
                childNumber,
                animNumber,
            });

            camp.save().then(() => {
                res.status(200).json({
                    result: true,
                    message: "camp successfully created",
                    url: resultCloudinary.secure_url
                });
            });
        } else {
            res.json({ result: false, error: resultMove });
        }
    } else {
        const camp = new Camp({
            idRecruiter,
            title,
            location,
            description,
            salary,
            // activities,
            // lodgingtype,
            startDate,
            endDate,
            childNumber,
            animNumber,
        });

        camp.save().then(() => {
            res.status(200).json({
                result: true,
                message: "camp successfully created",
            });
        });
    }
});

module.exports = router;
