var express = require('express');
var router = express.Router();
const User = require("../models/users");

router.post('/createuser', (req, res, next) => {
  const email = req.body.email;
  const uid = req.body.uid;
  const newUser = new User({
    mail: email,
    uid: uid,
  });
  newUser.save()
    .then(result => {
      res.status(201).json({
        message: "Utilisateur créé avec succès",
        createdUser: result
      });
    })
    .catch(err => {
      console.log(err); 
      res.status(500).json({
        error: err
      });
    });
});




router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
