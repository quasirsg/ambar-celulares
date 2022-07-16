const { getConnection } = require("./database");

const getDnis = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT dni FROM clients");
  return results;
};

const saveClient = async (client) => {
  const [dni, name, surname, phoneNumber] = client;
  try {
    console.log(dni, name, surname, phoneNumber);
  } catch (error) {}
};

module.exports = {
  getDnis,
};
