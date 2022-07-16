const mysql = require("promise-mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ambar",
});

function getConnection() {
  return connection;
}

module.exports = { getConnection };
