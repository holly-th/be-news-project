const {
  fetchTopics,
  fetchArticles,
  fetchArticleById,
  fetchComments,
} = require("../models/app.model");
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
  fetchTopics()
    .then((results) => {
      res.status(200).send({ results });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const article_id = req.params.article_id;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
  const article_id = req.params.article_id;
  fetchComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
