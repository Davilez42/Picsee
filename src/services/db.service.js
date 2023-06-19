const mysql2 = require("mysql2/promise");
const {bd_config} =  require('../configs/config')
const dbconnection = mysql2.createPool(bd_config) 
  dbconnection.on('connection', function (connection) {
    console.log('DB Connection established'); 
    connection.on('error', function (err) {
      console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
      console.error(new Date(), 'MySQL close', err);
    });

  });

module.exports = dbconnection;

