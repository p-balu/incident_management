let mongoose = require("mongoose");

//create model class for incidents
let incidentModel = mongoose.Schema(
  {
    userId: {
      type: String,
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
    remarks: {
      type: String,
      default: "",
    },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    collection: "incidents",
  }
);
module.exports = mongoose.model("Incident", incidentModel);
