const {
  fetchTopics,
  fetchArticles,
  fetchArticleById,
  fetchComments,
  addComment,
  changeVote,
} = require("../models/app.model");
exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  fetchArticles()
    .then((results) => {
      res.status(200).send({ results });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((results) => {
      res.status(200).send({ results });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const article_id = req.params.article_id;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getComments = (req, res, next) => {
  const article_id = req.params.article_id;
  fetchComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
exports.postComment = (req, res, next) => {
  const comment = req.body;
  const article_id = req.params.article_id;
  addComment(comment, article_id)
    .then((newComment) => {
      res.status(201).send({ newComment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const change = req.body;
  const article_id = req.params.article_id;
  changeVote(change, article_id)
    .then((changedArticle) => {
      res.status(201).send({ changedArticle });
    })
    .catch((err) => {
      next(err);
    });
};
