const express = require("express");
require("colors");
const cors =require('cors')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const ServiceWebAccessToken = require('./middleware/webAccessToken')
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
app.use(express.static('./src/storage/GaleryPics'))//mainmidler 
app.use(express.static('./src/public'))//mainmidler 
app.use(express.static('./src/storage/PerfilPics'))/

//RUTA PRINCIPAL

app.get('/HomPage',ServiceWebAccessToken.validateToken,async(req,resp)=>{   
    resp.status(200).sendFile('./public/homPage.html',{root:__dirname})
})

app.use(authRoutes)
app.use(userRoutes)

module.exports = app
