const mysql = require("promise-mysql");
require('dotenv').config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "ambar",
});

function getConnection() {
  return connection;
}

module.exports = { getConnection };
