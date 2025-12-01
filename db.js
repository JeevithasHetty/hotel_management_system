const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
console.log("🔍 DB_HOST:", process.env.DB_HOST);
console.log("🔍 DB_USER:", process.env.DB_USER);
console.log("🔍 DB_PASS:", process.env.DB_PASS ? "✔️ Present" : "❌ Missing");
console.log("🔍 DB_NAME:", process.env.DB_NAME);


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL Database");
});

module.exports = connection;
