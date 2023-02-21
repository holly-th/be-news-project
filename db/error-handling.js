exports.Errors400s = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad Request" });
  } else {
    res.status(404).send({ message: "ID not found" });
    next();
  }
};

exports.serverError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: `ERROR: server error` });
};
