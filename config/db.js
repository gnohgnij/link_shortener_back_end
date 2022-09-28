const mysql = require("mysql");

const pool = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net" || process.env.HOST,
  user: "bd849c5b1811a6" || process.env.USER,
  password: "68e14a54" || process.env.PASSWORD,
  database: "heroku_331e03a9aa3419d" || process.env.DATABASE,
  port: 3306,
});

module.exports = pool;
