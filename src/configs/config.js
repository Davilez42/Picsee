

bd_config = {
        host: 'containers-us-west-85.railway.app',
        user: 'root',
        password:'o1tIdLnOHAGgqfkLALMQ',
        port:5846,
        database: 'artgalery',
        waitForConnections: true,
        queueLimit: 0,
        connectionLimit : 10
    }



/* bd_config = {
    host: 'localhost',
    user: 'root',
    port:3306,
    database: 'artgalery',
    waitForConnections: true,
    maxIdle: 10,
    idleTimeout: 6000,
    queueLimit: 100000,
    connectionLimit : 10
}    */ 

server_config = {
    "PORT":5000,
    "HOST":"192.168.1.7",
}



module.exports = {
    bd_config,
    server_config
}