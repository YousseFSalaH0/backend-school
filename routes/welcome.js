const { WelcomeMsg, validate } = require("../models/welcome");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const welcome = await WelcomeMsg.find()
    .sort("_id")
    .select(
      "headTeacher title firstParagraph secondParagraph thirdParagraph _id image time"
    );
  res.send(welcome);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let welcomeMsg = new WelcomeMsg({
    headTeacher: req.body.headTeacher,
    title: req.body.title,
    firstParagraph: req.body.firstParagraph,
    secondParagraph: req.body.secondParagraph,
    thirdParagraph: req.body.thirdParagraph,
    image: req.body.image,
    time: new Date(),
  });
  welcomeMsg = await welcomeMsg.save();
  res.send(welcomeMsg);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const welcome = await WelcomeMsg.findByIdAndUpdate(
    req.params.id,
    {
      headTeacher: req.body.headTeacher,
      title: req.body.title,
      firstParagraph: req.body.firstParagraph,
      secondParagraph: req.body.secondParagraph,
      thirdParagraph: req.body.thirdParagraph,
      image: req.body.image,
    },
    {
      new: true,
    }
  );

  if (!welcome)
    return res
      .status(404)
      .send("The Welcome Message with the given ID was not found.");

  res.send(welcome);
});

router.delete("/:id", async (req, res) => {
  const welcome = await WelcomeMsg.findByIdAndRemove(req.params.id);

  if (!welcome)
    return res
      .status(404)
      .send("The Welcome Message with the given ID was not found.");

  res.send(welcome);
});

router.get("/:id", async (req, res) => {
  const welcome = await WelcomeMsg.findById(req.params.id);

  if (!welcome)
    return res
      .status(404)
      .send("The Welcome Message with the given ID was not found.");

  res.send(welcome);
});

module.exports = router;
