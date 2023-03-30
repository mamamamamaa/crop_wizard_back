require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();
const format = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(express.json());
app.use(logger(format));

module.exports = app;
