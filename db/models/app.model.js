const db = require("../connection");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then((results) => {
    // console.log(results.rows);
    return results.rows;
  });
};
