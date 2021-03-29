let mongoose = require("mongoose");

//create model class for incidents
let incidentModel = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    issueType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
