const express = require("express");
require("colors");
const cors = require("cors");
const routesv1 = require("./routes/v1/");
const logger = require("./middlewares/logger.js");
const path = require("path");
const { CORS_CONFIG } = require("../configs/configDevops");

const app = express();
app.use(logger);
app.use(cors(CORS_CONFIG));
//SETTINGS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views")); //especifico el motor de vistas
app.set("view engine", "ejs");
// Apis Versions
app.use("/api/v1", routesv1);

module.exports = app;
