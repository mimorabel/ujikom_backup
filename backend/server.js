const mysql = require("mysql2");
              require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err){
        console.error("GAgal koneksi ke db: ", err.message);
    } else {
        console.log("Berhasil konek, yeyy");
    }
});

export default db;