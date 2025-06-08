require("dotenv").config();

const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cors = require("cors");

const mainRouter = require("./routes/index");

const errorHandler = require("./middleware/error-handler");

const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;

app.use(cors());

app.use(express.json());
app.listen(PORT, () => {
  console.log("Listening on port 3001");
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(requestLogger);
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.use("/", mainRouter);
ap.use(errorLogger);
app.use(errors());
app.use(errorHandler);
