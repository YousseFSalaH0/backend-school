const Joi = require("joi");
const mongoose = require("mongoose");

const welcomeMsgSchema = new mongoose.Schema({
  headTeacher: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  title: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 50,
  },
  firstParagraph: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 5000,
  },
  secondParagraph: {
    type: String,
    minlength: 15,
    maxlength: 5000,
  },
  thirdParagraph: {
    type: String,
    minlength: 15,
    maxlength: 5000,
  },
  image: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const WelcomeMsg = mongoose.model("WelcomeMsg", welcomeMsgSchema);

function validateWelcomeMsg(welcome) {
  const schema = {
    headTeacher: Joi.string().min(5).max(50).required(),
    title: Joi.string().min(5).max(50),
    firstParagraph: Joi.string().min(5).max(5000).required(),
    secondParagraph: Joi.string().min(5).max(5000).required(),
    thirdParagraph: Joi.string().min(5).max(5000).required(),
    image: Joi.any().required(),
    time: Joi.date(),
  };

  return Joi.validate(welcome, schema);
}

exports.welcomeMsgSchema = welcomeMsgSchema;
exports.WelcomeMsg = WelcomeMsg;
exports.validate = validateWelcomeMsg;
