const { getConnection } = require("./database");

const getDnis = async () => {
  try {
    const conn = await getConnection();
    const results = await conn.query("SELECT dni FROM clients");
    return results;
  } catch (error) {
    throw error;
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

const getBenefits = async (dni) => {
  try {
    const conn = await getConnection();
    await conn.query(`SELECT imei FROM clients c INNER JOIN benefits b ON 
    c.dni = b.dni WHERE c.dni = ${dni}`);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getDnis,
  saveClient,
};
