const news = require("../routes/newss");
const images = require("../routes/images");
const welcomeMsg = require("../routes/welcome");
const stages = require("../routes/stages");
const contactUs = require("../routes/contactUs");
const error = require("../middleware/error");
const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/news", news);
  app.use("/images", express.static("images"));
  app.use("/public", express.static("public"));
  app.use("/api/images", images);
  app.use("/api/welcome", welcomeMsg);
  app.use("/api/stages", stages);
  app.use("/api/contact-us", contactUs);

  app.use(error);
};
