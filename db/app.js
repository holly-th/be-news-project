const express = require("express");
const app = express();
const {
  getTopics,
  getArticles,
  getArticleById,
  postComment,
  getComments,
} = require("../db/controllers/app.controller");
const {
  handlePSQLErrors,
  handleCustomErrors,
  serverError,
} = require("./error-handling");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.post("/api/articles/:article_id/comments", postComment);
app.get("/api/articles/:article_id/comments", getComments);

app.use(handlePSQLErrors, handleCustomErrors, serverError);

module.exports = app;
