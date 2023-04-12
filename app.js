require("dotenv").config();
const { DB, CLIENT_URL } = process.env;

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const format = app.get("env") === "development" ? "dev" : "short";

const authRouter = require("./routes/api/auth");
const userImageRouter = require("./routes/api/userImage");

app.use(
  cors({
    origin: ["http://localhost:3000", CLIENT_URL],
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(logger(format));

mongoose.connect(DB);

app.use("/api/auth", authRouter);
app.use("/api/image", userImageRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
