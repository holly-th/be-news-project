exports.serverError = (err, req, res, next) => {
  res.status(500).send({ message: `ERROR: server error` });
};
