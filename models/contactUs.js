const Joi = require("joi");
const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },

  city: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },

  governerator: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },

  mobileNo: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 11,
  },

  phoneNo: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 7,
  },
});

const ContactUs = mongoose.model("Contact Us", contactUsSchema);

function validateContactUs(contacts) {
  const schema = {
    street: Joi.string().required().min(3).max(50),
    city: Joi.string().required().min(3).max(50),
    governerator: Joi.string().required().min(3).max(50),
    mobileNo: Joi.string().required().min(11).max(11),
    phoneNo: Joi.string().required().min(7).max(7),
  };

  return Joi.validate(contacts, schema);
}

exports.contactUsSchema = contactUsSchema;
exports.ContactUs = ContactUs;
exports.validate = validateContactUs;
