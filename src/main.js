const { getConnection } = require("./database");

const getClient = async (dni) => {
  try {
    const conn = await getConnection();
    const results = await conn.query(
      `SELECT dni FROM clients c WHERE c.dni = ${dni}`
    );
    return results;
  } catch (error) {
    console.log(error);
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
    return await conn.query(`SELECT imei,phone_number,device,description,replacements,entry_date,mount,retired,fixed FROM clients c INNER JOIN benefits b ON 
    c.dni = b.dni WHERE c.dni = ${dni}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  getClient,
  saveClient,
  getBenefits,
};
