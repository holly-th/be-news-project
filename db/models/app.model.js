const db = require("../connection");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then((results) => {
    return results.rows;
  });
};

exports.fetchArticles = () => {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC;;`
    )
    .then((results) => {
      return results.rows;
    });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject("ID not found");
      } else {
        return result.rows;
      }
    });
};

exports.addComment = (comment, article_id) => {
  const { username, body } = comment;
  return db
    .query(
      `INSERT INTO comments (username, body, article_id) VALUES ($1, $2, $3) RETURNING *`[
        (comment, article_id)
      ]
    )
    .then((results) => {
      console.log(results.rows);
      return results.rows;
    });
};
