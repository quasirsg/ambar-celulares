const { getConnection } = require("./database");

const getDnis = async () => {
  try {
    const conn = await getConnection();
    const results = await conn.query("SELECT dni FROM clients");
    return results;
  } catch (error) {
    console.log(error);
  }
};

const saveClient = async (client) => {
  try {
    const conn = await getConnection();
    await conn.query("INSERT INTO clients SET ?", client);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDnis,
  saveClient,
};
