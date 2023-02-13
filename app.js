const express = require("express");
const colors = require("colors");
const cors =require('cors')
require('ejs')
const app = express();


app.use((req,res,next)=>{//LOGGER
   console.log(`${req.method}  url ${req.url}   Status: ${res.statusCode}`.blue)
   next()
})
app.use(cors())
//app.use('/',express.static('./src/public'))//mainmidler 
app.use(express.urlencoded({ extended: true }) );
app.use( express.json() );


//TODO


app.post('/login',(req,resp)=>{  
   return resp.json({"username":req.body['username'],"password":true})
})

app.post('/registro',(req,resp)=>{
   console.log(req.body)
   return resp.json({"username":req.body['username'],"password":true})
})



app.get('/HomPage',(req,resp)=>{
   console.log()
   return resp.sendFile('./src/public/perfil.html',{root:__dirname})
})









app.listen(5000);
console.log("server on port:5000".green);
