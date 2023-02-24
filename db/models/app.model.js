const db = require("../connection");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then((results) => {
    return results.rows;
  });
};

exports.fetchArticles = (topic, orderby = "desc", sortby = "created_at") => {
  let queryStr = `SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id `;
  const topicArray = [];
  const validOrders = ["desc", "asc"];
  const validSortby = [
    "author",
    "topic",
    "created_at",
    "votes",
    "title",
    "article_id",
  ];
  if (!validSortby.includes(sortby) || !validOrders.includes(orderby)) {
    return Promise.reject("Bad Request");
  }

  if (topic) {
    topicArray.push(topic);
    queryStr += ` WHERE articles.topic = $1 `;
  }
  queryStr += `GROUP BY articles.article_id ORDER BY ${sortby} ${orderby} `;

  return db.query(queryStr, topicArray).then((results) => {
    if (results.rowCount === 0) {
      return Promise.reject("Not found");
    } else {
      return results.rows;
    }
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

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users;`).then((results) => {
    return results.rows;
  });
};
