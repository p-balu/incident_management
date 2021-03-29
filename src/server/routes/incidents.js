let express = require("express");
let router = express.Router();
let passport = require("passport");
require("../config/passport")(passport);
let Incident = require("../models/incidents");
let ContactMe = require("../models/contacts");

router.get("/", function (req, res, next) {
  res.send("Hello from Express API server");
});

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

/* Get all Incidents from incidents collection*/
router.get(
  "/incidents",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    let token = getToken(req.headers);
    if (token) {
      Incident.find(function (err, IncidentList) {
        if (err) {
          return console.log(err);
        } else {
          //on success
          res.json({
            code: "200",
            data: IncidentList,
            message: "Incidents fetched successfully",
          });
        }
      });
    } else {
      return res.status(401).send({ success: false, msg: "Unauthorized." });
    }
  }
);

/* Get an Incident by id from incidents collection*/
router.get(
  "/incident/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    let token = getToken(req.headers);
    if (token) {
      let id = req.params.id;
      console.log(id);
      Incident.findById(id, (err, IncidentList) => {
        console.log(IncidentList);
        if (err) {
          console.log(err);
          res.end(err);
        } else if (IncidentList === undefined || IncidentList === null) {
          res.json({
            code: "304",
            message: "Incident not found",
          });
        } else {
          //on success
          res.json({
            code: "200",
            data: IncidentList,
            message: "Incident fetched successfully",
          });
        }
      });
    } else {
      return res.status(401).send({ success: false, msg: "Unauthorized." });
    }
  }
);

/* Post Incident page and store values in database*/
router.post(
  "/incident",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    let token = getToken(req.headers);
    if (token) {
      console.log("entered");
      console.log(req.query);

      let newIncident = Incident({
        userId: req.user._id,
        name: req.query.name,
        email: req.query.email,
        issueType: req.query.issueType,
        status: req.query.status,
        description: req.query.description,
        priority: req.query.priority,
      });

      Incident.create(newIncident, (err, IncidentList) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          //on success
          res.json({
            code: "200",
            data: IncidentList,
            message: "Incident created successfully",
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
  "/incident/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    let token = getToken(req.headers);
    if (token) {
      console.log("update entered");
      console.log(req.query);
      let id = req.params.id;
      console.log(id);

      let updateIncident = Incident({
        userId: req.user._id,
        _id: req.params.id,
        name: req.query.name,
        status: req.query.status,
        email: req.query.email,
        priority: req.query.priority,
        issueType: req.query.issueType,
      });

      Incident.updateOne({ _id: id }, updateIncident, (err) => {
        console.log("test loop", id);
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          console.log("success");
          //on success
          res.json({
            code: "200",
            message: "Incident updated successfully",
          });
        }
      });
    } else {
      return res.status(401).send({ success: false, msg: "Unauthorized." });
    }
  }
);

/* DELETE method for delete operation. */
router.delete(
  "/incident/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    let token = getToken(req.headers);
    if (token) {
      console.log("delete entered");
      let id = req.params.id;

      Incident.deleteOne({ _id: id }, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          //on success
          res.json({
            code: "200",
            message: "Incident deleted successfully",
          });
        }
      });
    } else {
      return res.status(401).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let token = getToken(req.headers);
    if (token) {
      console.log("authenticate entered");
      const { _id, username, role } = req.user;
      res
        .status(200)
        .json({ isAuthenticated: true, user: { username, role, _id } });
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
