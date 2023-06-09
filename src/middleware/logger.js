const fs = require('fs/promises')
const logger = (req,res,next)=>{
    const pet = ` IP: ${req.ip}  METHOD:${req.method}  ROUTE: ${req.url}`
    const fecha = new Date().toISOString().split('T')[0]
    const hora = new Date().toLocaleTimeString().split(' ')[0]
    fs.appendFile(`./logs/historyLogs_${fecha}.txt`,`- ${hora} - ${pet}\n`).then(err => { 
         console.log(` IP: ${req.ip.green}  METHOD:${req.method.red}  ROUTE: ${req.url.blue}`, "SAVE in log")  
    })
   
    next();
}
module.exports = logger