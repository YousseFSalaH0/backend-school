const { ContactUs, validate } = require("../models/contactUs");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const stages = await ContactUs.find().sort("name");
  res.send(stages);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let contacts = new ContactUs({
    _id: req.body._id,
    street: req.body.street,
    city: req.body.city,
    governerator: req.body.governerator,
    mobileNo: req.body.mobileNo,
    phoneNo: req.body.phoneNo,
  });
  contacts = await contacts.save();

  res.send(contacts);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const contacts = await ContactUs.findByIdAndUpdate(
    req.params.id,
    {
      street: req.body.street,
      city: req.body.city,
      governerator: req.body.governerator,
      mobileNo: req.body.mobileNo,
      phoneNo: req.body.phoneNo,
    },
    { new: true }
  );

  if (!contacts)
    return res
      .status(404)
      .send("The contacts with the given ID was not found.");

  res.send(contacts);
});

router.delete("/:id", async (req, res) => {
  const contacts = await ContactUs.findByIdAndRemove(req.params.id);

  if (!contacts)
    return res
      .status(404)
      .send("The contacts with the given ID was not found.");

  res.send(contacts);
});

router.get("/:id", async (req, res) => {
  const contacts = await ContactUs.findById(req.params.id);

  if (!contacts)
    return res
      .status(404)
      .send("The contacts with the given ID was not found.");

  res.send(contacts);
});

module.exports = router;
