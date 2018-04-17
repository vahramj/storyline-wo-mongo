const express = require("express");

const data = require("./utils/data.js");

const app = express();

app.use( express.static("./client") );

module.exports = app;