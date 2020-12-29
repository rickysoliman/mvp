const { Pool } = require('pg');

const pool = new Pool({
    user: 'rickymarasigan',
    host: 'localhost',
    database: 'theory_professor_users',
    password: 'C#minor7',
    port: 5432
});

module.exports = pool;