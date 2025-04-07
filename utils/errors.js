const BAD_REQUEST = (err, res) => {
  res.status(400).send({ message: err.message });
};
const NOT_FOUND = (err, res) => {
  res.status(404).send({ message: err.message });
};
const SERVER_ERROR = (err, res) => {
  res.status(500).send({ message: err.message });
};

module.exports = { BAD_REQUEST, NOT_FOUND, SERVER_ERROR };
