const express = require("express");

const app = express();

const mongoose = require("mongoose");

const mainRouter = require("./routes/index");

const { PORT = 3001 } = process.env;

app.use(express.json());
app.listen(PORT, () => {
  console.log("Listening on port 3001");
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
app.use((req, res, next) => {
  req.user = {
    _id: "67ee89ee67910f1aa16f3d87",
  };
  next();
});

app.use("/", mainRouter);
