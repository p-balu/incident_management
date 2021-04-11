let mongoose = require("mongoose");

//create model class for contacts
let contactMeModel = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    status: {
      type: String,
      default: "pending",
    },
    mobile: Number,
    description: String,
    created_at: { type: Date, default: Date.now },
  },

  {
    collection: "contactMe",
  }
);
module.exports = mongoose.model("ContactMe", contactMeModel);
