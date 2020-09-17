const Joi = require("joi");
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 5000,
  },
  image: {
    type: String,
    required: false,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model("News", newsSchema);

function validateNews(news) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    body: Joi.string().min(5).max(5000).required(),
    image: Joi.any().optional(),
    time: Joi.date(),
  };

  return Joi.validate(news, schema);
}

exports.newsSchema = newsSchema;
exports.News = News;
exports.validate = validateNews;
