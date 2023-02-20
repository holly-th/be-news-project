const express = require("express");
const app = express();
const { getTopics } = require("../db/controllers/app.controller");

app.get("/api/topics", getTopics);

module.exports = app;
