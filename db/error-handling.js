exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "22P02" || err === "Bad Request") {
    res.status(400).send({ message: "Bad Request" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err === "Not found" || err.code === "23503") {
    res.status(404).send({ message: "Not found" });
  } else {
    next(err);
  }
};
exports.serverError = (err, req, res, next) => {
  res.status(500).send({ message: `ERROR: server error` });
};
