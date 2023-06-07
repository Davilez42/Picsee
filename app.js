const express = require("express");
const colors = require("colors");
const cors =require('cors')
const config = require('./config')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const ServiceWebAccessToken = require('./middleware/ServiceWebAccessToken')
const path = require('path');

const app = express();



app.use((req,res,next)=>{//LOGGER
   console.log(` IP: ${req.ip.green} :METHOD ${req.method}  url ${req.url}   Status: ${res.statusCode}`.blue)
   next()//Continua con la ruta
})

app.use(cors({
  origin:['http://127.0.0.1:5500']
}))
//SETTINGS
app.use(express.urlencoded({ extended: true }) );
app.use( express.json() );
app.set('views',path.join(__dirname,'views'))//especifico el motor de vistas
app.set('view engine','ejs')
app.use(express.static('./storage/GaleriaImagenes'))//mainmidler 
app.use(express.static('./public'))//mainmidler 
app.use(express.static('./storage/FotosPerfil'))/

//RUTA PRINCIPAL
app.get('/',async(req,resp) =>{
    resp.sendFile('./public/inicio.html',{root:__dirname})
})  

app.get('/HomPage',ServiceWebAccessToken.validateToken,async(req,resp)=>{   
    resp.status(200).sendFile('./public/homPage.html',{root:__dirname})
  })

app.use(authRoutes)
app.use(userRoutes)

module.exports = app
