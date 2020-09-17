const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/sml-school")
    .then(() => winston.info("Connected to MongoDB..."));
};
