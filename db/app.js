const express = require("express");
const app = express();
const {
  getTopics,
  getArticles,
  getArticleById,
  postComment,
} = require("../db/controllers/app.controller");
const { Errors400s, serverError } = require("./error-handling");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.post("/api/articles/:article_id/comments", postComment);

app.use(Errors400s, serverError);

module.exports = app;
