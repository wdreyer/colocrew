var express = require('express');
var router = express.Router();

const Activities = require("../models/activities");
const Lodgings = require("../models/lodgings");
const Qualifications = require("../models/qualifications");

router.get('/activities', function(req, res, next) {
    Activities.find().then((data) => {
        if (data) {
          res.json({ result: true, activities: data.name });
          console.log(data.name);
        } else {
          res.json({
            result: false,
            error: `Pas d'activité à afficher`,
          });
        }
      });
});

router.get('/lodgings', function(req, res, next) {
    Lodgings.find().then((data) => {
        if (data) {
          res.json({ result: true, lodgings: data });
          console.log(data);
        } else {
          res.json({
            result: false,
            error: `Pas d'activité à afficher`,
          });
        }
      });
});

router.get('/qualifications', function(req, res, next) {
    Qualifications.find().then((data) => {
        if (data) {
          res.json({ result: true, qualifications: data });
          console.log(data);
        } else {
          res.json({
            result: false,
            error: `Pas d'activité à afficher`,
          });
        }
      });
});

module.exports = router;