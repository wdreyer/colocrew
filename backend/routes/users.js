var express = require('express');
var router = express.Router();
const User = require("../models/users");

router.post('/createUser', (req, res, next) => {
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
        return res.status(404).send({ error: 'User not found' });
      }
      return res.status(200).send({ message: 'User updated successfully', userUpdated: result });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).send({ error: 'Internal server error' });
    });
});





router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
