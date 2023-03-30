require("dotenv").config();
const { DB } = process.env;

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const format = app.get("env") === "development" ? "dev" : "short";

const authRouter = require("./routes/api/auth");
const userImageRouter = require("./routes/api/userImage");

app.use(cors());
app.use(express.json());
app.use(logger(format));

mongoose.connect(DB);

app.use("/api/auth", authRouter);
app.use("/api/images", userImageRouter);

module.exports = app;
