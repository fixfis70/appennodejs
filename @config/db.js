const mysql = require('mysql2/promise')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 50,
    timezone: '00:00'
});

(async () => {
    try {
        const conn = await pool.getConnection();
        conn.release();
        console.log('Connected to database');
    } catch (err){
        console.error(err)
    }
})();

module.exports = {pool}