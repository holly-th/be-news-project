const { fetchTopics } = require("../models/app.model");
exports.getTopics = (req, res) => {
  fetchTopics().then((results) => {
    // console.log(results);
    res.status(200).send(results);
  });
};
