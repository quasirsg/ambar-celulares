const { getConnection } = require("./database");

const getDnis = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT dni FROM clients");
  return results;
};

module.exports = {
  getDnis,
};
