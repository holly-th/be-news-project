exports.serverError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: `ERROR: server error` });
};
