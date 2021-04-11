let express = require("express");
let router = express.Router();
let passport = require("passport");
require("../config/passport")(passport);
let ContactMe = require("../models/contacts");

/* Post Contact page and redirect to home page */
router.post("/contact", (req, res, next) => {
  let newContact = ContactMe({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobile: req.body.mobile,
    description: req.body.description,
  });

  ContactMe.create(newContact, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({
        code: "200",
        data: Contact,
        message: "Contact added successfully",
      });
    }
  });
});

/*Get Contacts*/
router.get(
  "/contacts",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
      ContactMe.find(function (err, ContactList) {
        if (err) {
          return console.log(err);
        } else {
          //on success
          res.json({
            code: "200",
            data: ContactList,
            message: "Contacts fetched successfully",
          });
        }
      });
    } else {
      return res.status(401).send({ success: false, msg: "Unauthorized." });
    }
  }
);

/*Get Contact*/
router.get(
  "/contact/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
      let id = req.params.id;
      console.log(id);
      ContactMe.findById(id, (err, ContactList) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          //on success
          res.json({
            code: "200",
            data: ContactList,
            message: "Contact fetched successfully",
          });
        }
      });
    } else {
      return res.status(401).send({ success: false, msg: "Unauthorized." });
    }
  }
);
/* PUT method for update*/
router.put(
  "/contact/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
      console.log("update entered");
      console.log(req.query);
      let id = req.params.id;
      console.log(id);

      let updateContact = ContactMe({
        _id: req.params.id,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        status: req.query.status,
        email: req.query.email,
        mobile: req.query.mobile,
        description: req.query.description,
      });

      ContactMe.updateOne({ _id: id }, updateContact, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          console.log("success");
          //on success
          res.json({
            code: "200",
            message: "Contact updated successfully",
          });
        }
      });
    } else {
      return res.status(401).send({ success: false, msg: "Unauthorized." });
    }
  }
);

getToken = function (headers) {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports = router;
