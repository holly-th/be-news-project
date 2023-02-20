const { fetchTopics } = require("../models/app.model");
exports.getTopics = (req, res, next) => {
  fetchTopics().then((results) => {
    res.status(200).send(results);
  });
};
