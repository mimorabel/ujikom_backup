const mysql = require('mysql2'); 
require('dotenv').config({ path: __dirname + '/.env' });


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}, (err) => {
    if (err) {
        console.error('Gagal konek ke database:', err.message);
        return;
    }
    console.log('bisa jalan');
});
