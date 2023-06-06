const bd = require("mysql2/promise");
const config =  require('../config')
 const getConection = async()=>{
   return await bd.createConnection(config.DB_CONFIG);   
}

module.exports = getConection