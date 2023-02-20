const express = require("express");
const app = express();
const { getTopics } = require("../db/controllers/app.controller");
const { serverError } = require("./error-handling");

app.get("/api/topics", getTopics);

app.use(serverError);

module.exports = app;
