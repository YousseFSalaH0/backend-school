const winston = require("winston");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

require("./startup/logging")();
require("./startup/routes")(app);
// require("./startup/db")();
require("./startup/config");
require("./startup/validation")();
require("./startup/prod")(app);

var mongoPassword = "mohamed1170232";

var http = require("http");
var server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });

  var config = JSON.parse(process.env.APP_CONFIG);
  var MongoClient = require("mongodb").MongoClient;

  MongoClient.connect(
    "mongodb://" +
      config.mongo.user +
      ":" +
      encodeURIComponent(mongoPassword) +
      "@" +
      config.mongo.hostString,
    function (err, db) {
      if (!err) {
        res.end("We are connected to MongoDB");
      } else {
        res.end("Error while connecting to MongoDB");
      }
    }
  );
});
server.listen(process.env.PORT);

// const port = process.env.PORT || 5000;
// app.listen(port, () => winston.info(`Listening on port ${port}...`));
