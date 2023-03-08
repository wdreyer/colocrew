var express = require("express");
var router = express.Router();
const User = require("../models/users");

router.post('/createUser', (req, res, next) => {
  console.log('newuser', req.body)
  const email = req.body.email;
  const uid = req.body.uid;
  const newUser = new User({
    email: email,
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

router.get('/authByUid/:uid', (req, res, next) => {
  console.log(req)
  User.findOne({uid:req.params.uid})
  .then((data) =>{
    if(data){
      res.json({result:true, data:data })
    }
    else {
      res.json({
        result: false,
        error: "no user with this UID find",
      });
    }
  } )
});

router.put('/updateRole', (req, res, next) => {
  const { uid, isCandidate, isRecruiter } = req.body;
  console.log(isCandidate);
  User.findOneAndUpdate({ uid }, { isCandidate, isRecruiter }, { new: true })
    .then(result => {
      if (result.nModified === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ message: 'User updated successfully', userUpdated: result });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    });
});

router.put("/", function (req, res) {
  console.log("enter the road")
  console.log(req.body)
  const {uid,firstname,lastname, email, phone, description, birthDate } = req.body;
  // Si l'id n'existe pas : return res.json({result: false})
  User.findOneAndUpdate({uid: uid}, {
    firstname,
    lastname,
    email,
    phone,
    birthDate,
    description,
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
