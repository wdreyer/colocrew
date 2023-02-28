var express = require('express');
var router = express.Router();
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');


router.put('/', function(req, res) {
  if (!checkBody(req.body, ['surname', 'name' , 'address' , 'phone' , 'birthDate'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  User.updateOne({
    surname: req.body.surname,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    birthDate: req.body.birthdate,
    description: req.body.description,
  }).then(() => {
    res.json({result: true})
  })
});





module.exports = router;
