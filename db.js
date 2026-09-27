/* import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root', 
    database: 'canalAnonimo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
*/

import pg from 'pg'
const { Pool } = pg;

const db = new Pool({
    host: 'db.kwkwgcuvgeutpiizzoax.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Banco#741%Nfas'
});


export default db;