const { Pool } = require('pg');

const db = new Pool ({
    host: 'localhost',
    port: 3306,
    database: canalAnonimo,
});