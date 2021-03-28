let passport = require("passport");
let settings = require("../config/settings");
require("../config/passport")(passport);
let express = require("express");
let jwt = require("jsonwebtoken");
let router = express.Router();
let User = require("../models/user");

//post request for register
router.post("/register", function (req, res) {
  if (
    !req.body.username ||
    !req.body.name ||
    !req.body.email ||
    !req.body.password
  ) {
    console.log("no entries");
    res.json({
      success: false,
      msg: "Please enter email, username and password.",
    });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
    });
    // save the user
    User.create(newUser, (err) => {
      console.log(" entries");

      if (err) {
        console.log("err register entered");
        return res.json({
          success: false,
          msg: "Username or email already exists.",
        });
      }
      console.log("success");
      res.json({ success: true, msg: "Successful created new user." });
    });
  }
});

//post request for login
router.post("/login", (req, res) => {
  console.log(req.body.username);
  User.findOne(
    {
      username: req.body.username,
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
            return res.json({ success: true, token: "JWT " + token });
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
