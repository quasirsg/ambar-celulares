const mysql = require("promise-mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "quasir12",
  database: "ambar",
});

function getConnection() {
  return connection;
}

module.exports = { getConnection };
