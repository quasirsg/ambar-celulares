const mysql = require("promise-mysql");
require('dotenv').config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "ambar",
});

function getConnection() {
  return connection;
}

module.exports = { getConnection };
