const {Pool} = require("pg");
const { DB_CONFIG } = require("../../configs/config");

const pool = new Pool(DB_CONFIG); // creo pool de conexiones

// EVENTOS DEL POOL
pool.on("connect", function (connection) {
  // evento cuando se crea una nueva conexion
  console.log(new Date(), "📸 ✔️ Picmont: Created new Connection ");
});

pool.on("acquire", function (connection) {
  // evento cuando se obtiene una conexion existente
  console.log("📸 Connection has been acquired");
});

pool.on("release", function (connection) {
  console.log("📸 Connection has been released");
});
module.exports = pool;
