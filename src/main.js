const { getConnection } = require("./database");

const getDnis = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT dni FROM clients");
  return results;
};

const saveClient = async (client) => {
  try {
    const conn = await getConnection();
    await conn.query("INSERT INTO clients SET ?", client);
    /* new Notification("title", { body: "hola" }); */
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getDnis,
  saveClient,
};
