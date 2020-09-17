const Joi = require("joi");
const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: false,
  },
  letter: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1,
  },
  numberOfStudents: {
    type: Number,
    required: true,
  },
});

const Stage = mongoose.model("Stages", stageSchema);

function validateClasses(stage) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    letter: Joi.string().min(1).max(1).required(),
    numberOfStudents: Joi.number().min(5).max(50).required(),
  };

  return Joi.validate(stage, schema);
}

exports.stageSchema = stageSchema;
exports.Stage = Stage;
exports.validate = validateClasses;
