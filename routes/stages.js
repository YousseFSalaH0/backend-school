const { Stage, validate } = require("../models/stage");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const stages = await Stage.find().sort("name");
  res.send(stages);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let stage = new Stage({
    name: req.body.name,
    letter: req.body.letter,
    numberOfStudents: req.body.numberOfStudents,
  });
  stage = await stage.save();

  res.send(stage);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const stage = await Stage.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      letter: req.body.letter,
      numberOfStudents: req.body.numberOfStudents,
    },
    { new: true }
  );

  if (!stage)
    return res.status(404).send("The stage with the given ID was not found.");

  res.send(stage);
});

router.delete("/:id", async (req, res) => {
  const stage = await Stage.findByIdAndRemove(req.params.id);

  if (!stage)
    return res.status(404).send("The stage with the given ID was not found.");

  res.send(stage);
});

router.get("/:id", async (req, res) => {
  const stage = await Stage.findById(req.params.id);

  if (!stage)
    return res.status(404).send("The stage with the given ID was not found.");

  res.send(stage);
});

module.exports = router;
