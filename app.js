require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const format = app.get("env") === "development" ? "dev" : "short";
const { DB } = process.env;

app.use(cors());
app.use(express.json());
app.use(logger(format));

mongoose.connect(DB);

module.exports = app;
