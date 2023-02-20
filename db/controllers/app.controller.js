const { fetchTopics, fetchArticles } = require("../models/app.model");
exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  fetchArticles()
    .then((results) => {
      res.status(200).send({ results });
    })
    .catch(next);
};
exports.getTopics = (req, res, next) => {
  fetchTopics().then((results) => {
    res.status(200).send({ results });
  });
};
