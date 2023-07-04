const express = require("express");
require("colors");
const cors =require('cors')
const routesv1 =  require('./v1/routes/index')
const logger = require('./middleware/logger.js')
const path = require('path');

const app = express();
app.use(logger)
app.use(cors())
//SETTINGS
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );
app.set('views',path.join(__dirname,'views'))//especifico el motor de vistas
app.set('view engine','ejs')
app.use(express.static('./src/public'))//mainmidler 


app.use('/api/v1',routesv1)


module.exports = app
