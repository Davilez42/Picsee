module.exports = {
    "PORT":5000,
    "HOST":"192.168.1.7",
    "DB_CONFIG":{
        host: 'localhost',
        user: 'root',
        database: 'artgalery',
        waitForConnections: true,
        connectionLimit: 100,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 100
    }
}