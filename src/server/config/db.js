require("dotenv").config();
module.exports = {
  URI:
    // "mongodb+srv://balu:SomeSecret@cluster0.n0iz4.mongodb.net/incident_management?retryWrites=true&w=majority",
    (URI = "mongodb://localhost/incident_management"),
};
