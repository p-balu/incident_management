let mongoose = require("mongoose");

//create model class for incidents
let incidentModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    email: {
      type: String,
      required: "Email is required",
    },
    issueType: {
      type: String,
      required: "Type of Issue is required",
    },
    description: {
      type: String,
      required: "Description is required",
    },
    status: {
      type: String,
      default: "pending",
    },
    priority: {
      type: String,
      default: "low",
    },
  },
  {
    collection: "incidents",
  }
);
module.exports = mongoose.model("Incident", incidentModel);
