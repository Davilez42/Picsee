const bd = require("mysql2/promise");
 const getConection = async()=>{
    config = {
        host: 'localhost',
        user: 'root',
        database: 'artgalery',
        waitForConnections: true,
        connectionLimit: 100,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 100
    };
   return await bd.createConnection(config);   
}

module.exports = getConection