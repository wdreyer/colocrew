var express = require("express");
var router = express.Router();
const User = require("../models/users");
const cloudinary = require("cloudinary").v2;

router.post("/createUser", (req, res, next) => {
  console.log("newuser", req.body);
  const email = req.body.email;
  const uid = req.body.uid;
  const newUser = new User({
    email: email,
    uid: uid,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Utilisateur créé avec succès",
        createdUser: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/authByUid/:uid", (req, res, next) => {
  console.log(req);
  User.findOne({ uid: req.params.uid }).then((data) => {
    if (data) {
      res.json({ result: true, data: data });
    } else {
      res.json({
        result: false,
        error: "no user with this UID find",
      });
    }
  });
});

router.get("/displayCampByUser/:uid", (req, res, next) => {
  User.findOne({ uid: req.params.uid })
    .populate({
      path: "camps",
    })
    .then((data) => {
      if (data) {
        res.json({ result: true, data: data.camps });
      } else {
        res.json({
          result: false,
          error: "no user with this UID find",
        });
      }
    });
});

router.put("/updateRole", (req, res, next) => {
  const { uid, isCandidate, isRecruiter } = req.body;
  console.log(isCandidate);
  User.findOneAndUpdate({ uid }, { isCandidate, isRecruiter }, { new: true })
    .then((result) => {
      if (result.nModified === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "User updated successfully", userUpdated: result });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    });
});

router.put("/", async function (req, res) {
  console.log("enter the road");
  console.log(req.body);
  const {
    uid,
    firstname,
    lastname,
    email,
    phone,
    description,
    birthDate,
    photos,
  } = req.body;
  // Si l'id n'existe pas : return res.json({result: false})

  if (!req.files || !req.files.avatarFromFront) {
    return res.status(400).json({ error: "Missing avatar file" });
  }

  const avatarPath = `./tmp/${uniqid()}.jpg`;
  const resultMove = await req.files.avatarFromFront.mv(avatarPath);

  if (!resultMove) {
    try {
      const resultCloudinary = await cloudinary.uploader.upload(avatarPath);
      fs.unlinkSync(avatarPath);

      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { photos: resultCloudinary.secure_url },
        { new: true }
      );

      User.findOneAndUpdate(
        { uid: uid },
        {
          firstname,
          lastname,
          email,
          phone,
          photos: resultCloudinary.secure_url,
          birthDate,
          description,
        }
      ).then((data) => {
        console.log(data);
        if (data === null) {
          return res.json({ result: false });
        } else {
          res.json({ result: true });
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(500).json({ error: resultMove });
  }
});

// User.findOneAndUpdate({uid: uid}, {
//   firstname,
//   lastname,
//   email,
//   phone,
//   photos: resultCloudinary.secure_url,
//   birthDate,
//   description,
// }).then((data) => {
//   console.log(data);
//   if (data === null) {
//     return res.json({ result: false });
//   } else {
//     res.json({ result: true });
//   }
// });

module.exports = router;
