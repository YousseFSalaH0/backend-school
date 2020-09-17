const { News, validate } = require("../models/news");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const news = await News.find()
    .sort("_id")
    .select("title body _id image time");
  res.send(news);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let news = new News({
    title: req.body.title,
    body: req.body.body,
    image: req.body.image,
    time: new Date(),
  });
  news = await news.save();
  res.send(news);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const news = await News.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, body: req.body.body },
    {
      new: true,
    }
  );

  if (!news)
    return res.status(404).send("The news with the given ID was not found.");

  res.send(news);
});

router.delete("/:id", async (req, res) => {
  const news = await News.findByIdAndRemove(req.params.id);

  if (!news)
    return res.status(404).send("The news with the given ID was not found.");

  res.send(news);
});

router.get("/:id", async (req, res) => {
  const news = await News.findById(req.params.id);

  if (!news)
    return res.status(404).send("The news with the given ID was not found.");

  res.send(news);
});

module.exports = router;
