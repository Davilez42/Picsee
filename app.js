const express = require("express");
const colors = require("colors");
const { json, response } = require("express");
const fs = require("fs");
const os = require("os");
const { dirname } = require("path");
const bodyParser = require('body-parser');
const cors =require('cors')
const app = express();

app.use(cors())
app.use('/',express.static('./src/public'))//mainmidler 
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );


//TODO
app.post('/login',(req,resp)=>{
   console.log(req.body)
   return resp.send(`Estamos trabajando en eso ; ${req.body})`)
})











app.listen(5000);
console.log("server on port:5000".green);
