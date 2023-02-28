var express = require("express");
var router = express.Router();
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

router.put("/", function (req, res) {
  if (
    !checkBody(req.body, ["surname", "name", "address", "phone", "birthDate"])
  ) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // Si l'id n'existe pas : return res.json({result: false})

  User.findByIdAndUpdate(req.body._id, {
    surname: req.body.surname,
    name: req.body.name,
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
