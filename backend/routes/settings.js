var express = require('express');
var router = express.Router();

const Activities = require("../models/activities");
const Lodgings = require("../models/lodgings");
const Qualifications = require("../models/qualifications");
const Contracts = require("../models/contracts");

router.get('/activities', function(req, res, next) {
    Activities.find().then((data) => {
        if (data) {
          res.json({ result: true, data: data});
          //console.log(data);
        } else {
          res.json({
            result: false,
            error: `Pas de data à afficher`,
          });
        }
      });
});

router.get('/lodgings', function(req, res, next) {
    Lodgings.find().then((data) => {
        if (data) {
          res.json({ result: true, data: data });
          //console.log(data);
        } else {
          res.json({
            result: false,
            error: `Pas de data à afficher`,
          });
        }
      });
});

router.get('/qualifications', function(req, res, next) {
    Qualifications.find().then((data) => {
        if (data) {
          res.json({ result: true, data: data });
          //console.log(data);
        } else {
          res.json({
            result: false,
            error: `Pas de data à afficher`,
          });
        }
      });
});

router.get('/contractType', function(req, res, next) {
  Contracts.find().then((data) => {
      if (data) {
        //console.log(data[0].types);
        const tabObj = data[0].types.map((e) => {return(
            {name:e}
        )})
        //console.log (tabObj);
        res.json({ result: true, data: tabObj });
        
      } else {
        res.json({
          result: false,
          error: `Pas de data à afficher`,
        });
      }
    });
});
module.exports = router;