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

      if (err) {
        return res.json({
          success: false,
          msg: "Username or email already exists.",
        });
      }
      res.json({ success: true, msg: "Successful created new user." });
    });
  }
});

//post request for login
router.post("/login", (req, res) => {
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
            return res.json({
              success: true,
              token: "JWT " + token,
              role: user.role,
              id: user._id,
              username:user.username
            });
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
