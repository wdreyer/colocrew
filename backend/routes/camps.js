var express = require("express");
var router = express.Router();
const Camp = require("../models/camps");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

const uniqid = require("uniqid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

router.post("/createCamp", async (req, res) => {
    

    if (!req.files) {
        console.log("here",req.body)

        // Create new camp when any picture in DB
        if (
            !checkBody(req.body, [
                "idRecruiter",
                "title",
                "location",
                "description",
                "salary",
                "activities",
                "lodgingtype",
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
            activities,
            lodgingtype,
            startDate,
            endDate,
            childNumber,
            animNumber,
            
        } = req.body;
        const datePost = Date.now();


        const camp = new Camp({
            idRecruiter,
            title,
            location,
            description,
            salary,
            activities,
            lodgingtype,
            startDate,
            endDate,
            childNumber,
            animNumber,
            datePost,
        });

        camp.save().then((result) => {
            User.findOneAndUpdate(
                { _id: idRecruiter },
                { $push: { camps: result._id } }
            ).then((data) => {
                if (data === null) {
                    return res.json({ result: false });
                } else {
                    res.status(200).json({
                        result: true,
                        message: "camp successfully created",
                    });
                }
            });
        });
    } else {
        // Create new camp with one or more picture in DB
        console.log("here",req.body.newCamp)
        if (
            !checkBody(JSON.parse(req.body.newCamp), [
                "idRecruiter",
                "title",
                "location",
                "description",
                "salary",
                "activities",
                "lodgingtype",
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
            activities,
            lodgingtype,
            startDate,
            endDate,
            childNumber,
            animNumber,
        } = JSON.parse(req.body.newCamp);

        const photoPath = `./tmp/${uniqid()}.jpg`;
        const resultMove = await req.files.photoFromFront.mv(photoPath);

        if (!resultMove) {
            const resultCloudinary = await cloudinary.uploader.upload(
                photoPath
            );
            fs.unlinkSync(photoPath);
            const datePost = Date.now();


            const camp = new Camp({
                idRecruiter,
                title,
                location,
                description,
                salary,
                activities,
                photos: resultCloudinary.secure_url,
                lodgingtype,
                startDate,
                endDate,
                childNumber,
                animNumber,
                datePost : datePost,
            });

            camp.save().then((result) => {
                User.findOneAndUpdate(
                    { _id: idRecruiter },
                    { $push: { camps: result._id } }
                ).then((data) => {
                    if (data === null) {
                        return res.json({ result: false });
                    } else {
                        res.status(200).json({
                            result: true,
                            message: "camp successfully created",
                        });
                    }
                });
            });
        } else {
            res.json({ result: false, error: resultMove });
        }
    }
});


router.get('/:idRecruiter', (req, res, next) => {
    Camp.find({idRecruiter: req.params.idRecruiter})
    .populate('idRecruiter')
    .then((data) =>{
      if(data){
        res.json({result:true, data:data })
      }
      else {
        res.json({
          result: false,
        });
      }
    } )
});

module.exports = router;
