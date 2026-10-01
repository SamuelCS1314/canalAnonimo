import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root', 
    database: 'canalAnonimo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


export default db;