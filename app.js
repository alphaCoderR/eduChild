const express = require("express");
const bodyParser = require("body-parser");
var easyinvoice = require("easyinvoice");

const app = express();

app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/landing.html");
});

app.listen(5000, (req, res) => {
  console.log("Server is running on port 5000");
});
