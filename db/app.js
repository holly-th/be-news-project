const express = require("express");
const app = express();
const {
  getTopics,
  getArticles,
  getArticleById,
} = require("../db/controllers/app.controller");
const { serverError } = require("./error-handling");

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.use(serverError);

module.exports = app;
