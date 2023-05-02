const express = require("express");
const colors = require("colors");
const cors =require('cors')
const controllerUser = require('./routes/controllerUser')
const RepositorioPosts =  require('./models/RepositorioPosts')



const path =  require('path');
const { render } = require("ejs");
const app = express();


app.use((req,res,next)=>{//LOGGER
   console.log(` IP: ${req.ip.green} :METHOD ${req.method}  url ${req.url}   Status: ${res.statusCode}`.blue)
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
app.get('/',async(req,resp) =>{
    //TODO se consulta las imagenes mas virales de los ultimo dia 
   const imag = await  RepositorioPosts.getPosts_Relevant()
    imagenes =  {"imagenes_":imag}
    resp.render('index',imagenes)
})  



app.use(controllerUser)



app.listen(5000);
console.log("server on port:5000".green);
