const express = require("express");
require("colors");
const cors = require("cors");
const routesv1 = require("./routes/v1/");
const logger = require("./middlewares/logger.middleware");
const path = require("path");
const { CORS_CONFIG } = require("../configs/config");
const handlerError = require('./middlewares/handlerError.middleware')
const app = express();
//LOADERS
app.use(logger);
app.use(cors(CORS_CONFIG));
//SETTINGS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs"); //especifico el motor de vistas

// Apis Versions
app.use("/api/v1", routesv1);
app.use(handlerError)
module.exports = app;
