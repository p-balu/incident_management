let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let logger = require("morgan");
let cors = require("cors");
const PORT = process.env.PORT || 8080;

let app = express();

//database setup
let mongoose = require("mongoose");
let DB = require("./config/db");

//point mongoose to the DB URI
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error: "));
mongoDB.once("open", () => {
  console.log("Connected to mongoDB...");
});

//cors middleware
app.use(cors());

//Bodypasrser
app.use(express.urlencoded({ extended: false }));

//import routes
let incidentsRouter = require("./routes/incidents");
let auth = require("./routes/auth");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", incidentsRouter);
app.use("/api/auth", auth);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});

module.exports = app;
