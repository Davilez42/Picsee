const mysql2 = require("mysql2/promise");
const { DB_CONFIG } = require("../../configs/config");

const pool = mysql2.createPool(DB_CONFIG); // creo pool de conexiones

// EVENTOS DEL POOL
pool.on("connection", function (connection) {
  // evento cuando se crea una nueva conexion
  console.log(new Date(), "📸 ✔️ Picmont: Created new Connection ");
});

pool.on("acquire", function (connection) {
  // evento cuando se obtiene una conexion existente
  console.log("📸 Connection  %d has been acquired", connection.threadId);
});

pool.on("release", function (connection) {
  console.log("📸 Connection %d has been released", connection.threadId);
});
module.exports = pool;
