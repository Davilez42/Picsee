

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


bd_config_dev = {
    host: 'containers-us-west-85.railway.app',
    password:'o1tIdLnOHAGgqfkLALMQ',
    user: 'root',
    port:5846,
    database: 'artgalery_dev',
    waitForConnections: true,
    queueLimit: 0,
    connectionLimit : 10
}     

server_config = {
    "PORT":5000,
    "HOST":"localhost",
    'Logger':false
}



module.exports = {
    bd_config,
    bd_config_dev,
    server_config,
}