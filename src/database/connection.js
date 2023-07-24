const mysql2 = require("mysql2/promise");
const { DB_CONFIG } = require("../../configs/config");

const dbconnection = mysql2.createPool(DB_CONFIG);

dbconnection.on("connection", function (connection) {
  console.log(new Date(), "📸 ✔️ Picmont: DB Connection established");

  connection.on("error", function (err) {
    console.error(new Date(), "📸 ❌ Picmont: DB Connection error:", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "📸 ✖️ Picmont: DB Connection close", err);
  });
});

module.exports = dbconnection;
