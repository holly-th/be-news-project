const {
  fetchTopics,
  fetchArticles,
  fetchArticleById,
  fetchComments,
  addComment,
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

exports.postComment = (req, res, next) => {
  const comment = req.body;
  const article_id = req.params.article_id;
  addComment(comment, article_id).then((newComment) => {
    res.status(201).send({ newComment });
  });
};
exports.getComments = (req, res, next) => {
  const article_id = req.params.article_id;
  fetchComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
