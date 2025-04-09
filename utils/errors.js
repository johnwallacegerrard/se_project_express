const BAD_REQUEST = (err, res) => {
  res.status(400).send({ message: "bad request" });
};
const NOT_FOUND = (err, res) => {
  res.status(404).send({ message: "document not found" });
};
const SERVER_ERROR = (err, res) => {
  res.status(500).send({ message: "an error has occured on the server" });
};

module.exports = { BAD_REQUEST, NOT_FOUND, SERVER_ERROR };
