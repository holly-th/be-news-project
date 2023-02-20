const express = require("express");
const app = express();
const { getTopics, getArticles } = require("../db/controllers/app.controller");
const { serverError } = require("./error-handling");

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.use(serverError);

module.exports = app;
