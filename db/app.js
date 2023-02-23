const express = require("express");
const app = express();
const {
  getTopics,
  getArticles,
  getArticleById,
  getComments,
  postComment,
  patchArticle,
  getUsers,
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

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticle);

app.get("/api/users", getUsers);
app.use(handlePSQLErrors, handleCustomErrors, serverError);

module.exports = app;
