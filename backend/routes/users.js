var express = require("express");
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




router.put("/", function (req, res) {
  if (
    !checkBody(req.body, ["surname", "name", "address", "phone", "birthDate"])
  ) {
    res.json({ result: false, error: "Vous n'avez pas complété tous les chammps requis" });
    return;
  }
  // Si l'id n'existe pas : return res.json({result: false})

  User.findByIdAndUpdate(req.body._id, {
    surname: req.body.surname,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    birthDate: req.body.birthDate,
    description: req.body.description,
  }).then((data) => {
    console.log(data);
    if (data === null) {
      return res.json({ result: false });
    } else {
      res.json({ result: true });
    }
  });
});

module.exports = router;
