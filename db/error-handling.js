exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad Request" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err === "ID not found") {
    res.status(404).send({ message: "Invalid ID" });
  } else {
    next(err);
  }
};
exports.serverError = (err, req, res, next) => {
  res.status(500).send({ message: `ERROR: server error` });
};
