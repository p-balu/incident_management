let passport = require("passport");
let settings = require("../config/settings");
require("../config/passport")(passport);
let express = require("express");
let jwt = require("jsonwebtoken");
let router = express.Router();
let User = require("../models/user");

//post request for register
router.post("/register", function (req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.json({
      success: false,
      message: "Please provide name,email and password.",
    });
  } else {
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: "Erro" });
      }
      res.json({ success: true, msg: "Successful created new user." });
    });
  }
});

//post request for login
router.post("/login", function (req, res) {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. Email not found.",
        });
      } else {
        // check if password matches or not
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is correct
            let token = jwt.sign(user.toJSON(), settings.secret);
            res.json({ success: true, token: "JWT " + token });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      }
    }
  );
});

module.exports = router;
