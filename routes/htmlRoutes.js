
var express = require("express");
var router = express.Router();
var path = require("path");

module.exports = function(app) {
// get route -> index
app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "/../public/login-page.html"));
  //res.sendFile(__dirname + "/../CSS/login-style.css");
});

}