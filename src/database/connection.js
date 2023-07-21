const mysql2 = require("mysql2/promise");
const { DB_CONGIG } = require("../../configs/configDevops");

const dbconnection = mysql2.createPool(DB_CONGIG);

dbconnection.on("connection", function (connection) {
  console.log(new Date(),"DB Connection established");
  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

module.exports = dbconnection;
