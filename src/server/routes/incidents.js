let express = require("express");
let router = express.Router();
let passport = require("passport");
require("../config/passport")(passport);
let Incident = require("../models/incidents");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.send("Hello from API server");
  }
);

/* Get all Incidents from incidents collection*/
router.get(
  "/incident",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
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
  }
);

/* Get an Incident by id from incidents collection*/
router.get(
  "/incident/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
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
  }
);

/* Post Incident page and store values in database*/
router.post(
  "/incident",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log("entered");
    console.log(req.query);

    let newIncident = Incident({
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
  }
);

/* PUT method for update*/
router.put(
  "/incident/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log("update entered");
    console.log(req.query);
    let id = req.params.id;
    console.log(id);

    let updateIncident = Incident({
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
  }
);

/* DELETE method for delete operation. */
router.delete(
  "/incident/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
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
  }
);
module.exports = router;
