const express = require("express");
const app = express();
const {
  getTopics,
  getArticles,
  getArticleById,
  patchArticle,
  getComments,
} = require("../db/controllers/app.controller");
const { Errors400s, serverError } = require("./error-handling");

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getComments);

app.patch("/api/articles/:article_id", patchArticle);

app.use(Errors400s, serverError);

module.exports = app;
