const express = require("express");
const colors = require("colors");
const cors =require('cors')
require('ejs')
const controllerUser = require('./controllerUser')
const path =  require('path');
const { render } = require("ejs");
const app = express();


app.use((req,res,next)=>{//LOGGER
   console.log(`${req.method}  url ${req.url}   Status: ${res.statusCode}`.blue)
   next()
})

app.use(cors())

//SETTINGS
app.use(express.urlencoded({ extended: true }) );
app.use( express.json() );
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static('./storage/GaleriaImagenes'))//mainmidler 
app.use(express.static('./public'))//mainmidler 


//RUTA PRINCIPAL
app.get('/',(req,resp)=>{
    //TODO se consulta las imagenes mas virales de los ultimo dia 
    //TODO llamo RepositorioImagenes.obtenesImagenesVirales()
    imagenes =  {"imagenes":["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg"]}
    resp.render('index',imagenes)
})



app.use(controllerUser)











app.listen(5000);
console.log("server on port:5000".green);
