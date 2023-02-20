exports.serverError = (err, req, res, next) => {
  if (err) {
    console.log(err);
  } else {
    res.status(500).send({ message: `ERROR: server error` });
  }
};
