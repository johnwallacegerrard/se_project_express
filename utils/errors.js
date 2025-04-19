const BAD_REQUEST = (err, res) => {
  res.status(400).send({ message: "Bad request" });
};
const NOT_FOUND = (err, res) => {
  res.status(404).send({ message: "Document not found" });
};
const SERVER_ERROR = (err, res) => {
  res.status(500).send({ message: "An error has occured on the server" });
};

const DUPLICATE_EMAIL = (err, res) => {
  res.status(409).send({ message: "A user already exists with that email" });
};

const UNAUTHORIZED_REQUEST = (err, res) => {
  res.status(401).send({ message: "Incorrect password or email" });
};

const FORBIDDEN_REQUEST = (err,res) => {
  res.status(403).send({message:"You do not have permission"})
}

module.exports = {
  DUPLICATE_EMAIL,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED_REQUEST,
  FORBIDDEN_REQUEST
};
