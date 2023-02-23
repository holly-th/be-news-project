const db = require("../connection");
const comments = require("../data/test-data/comments");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then((results) => {
    return results.rows;
  });
};

exports.fetchArticles = (queries) => {
  const queryValues = [];

  let queryStr = `SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC;`;

  if (queries.topic) {
    queryValues.push(queries.topic);
    queryStr = ` SELECT articles.*,COUNT(comments.article_id) AS comment_count FROM articles  LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.topic = '$1' GROUP BY articles.article_id ORDER BY created_at DESC;`;
  }
  return db.query(queryStr, queryValues).then((results) => {
    return results.rows;
  });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject("Not found");
      } else {
        return result.rows;
      }
    });
};

exports.fetchComments = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE comments.article_id = $1 ORDER BY comments.created_at DESC;`,
      [article_id]
    )
    .then((results) => {
      if (results.rowCount === 0) {
        return Promise.reject("Not found");
      }
      return results.rows;
    });
};

exports.addComment = (comment, article_id) => {
  const { username, body } = comment;
  if (!username || !body) {
    return Promise.reject("Bad Request");
  } else {
    return db
      .query(
        `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *`,
        [username, body, article_id]
      )
      .then((results) => {
        return results.rows;
      });
  }
};

exports.changeVote = (change, article_id) => {
  const changeVoteBy = change.inc_votes;
  if (!change || !article_id) {
    return Promise.reject("Bad Request");
  } else {
    return db
      .query(
        `UPDATE articles SET votes = votes + $1 WHERE articles.article_id = $2 RETURNING *`,
        [changeVoteBy, article_id]
      )
      .then((results) => {
        if (results.rowCount === 0) {
          return Promise.reject("Not found");
        }
        return results.rows;
      });
  }
};
