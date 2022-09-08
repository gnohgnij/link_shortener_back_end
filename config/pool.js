const mysql = require("mysql");

const pool = mysql.createPool({
  waitForConnections: true,
  connectionLimit: 100,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
  debug: false,
});

module.exports = pool;
