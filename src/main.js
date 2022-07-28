const { getConnection } = require("./database");
const axios = require("axios").default;

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

const saveBenefit = async (benefit) => {
  try {
    const conn = await getConnection();
    await conn.query("INSERT INTO benefits SET ?", benefit);
  } catch (error) {
    throw error;
  }
};

const getBenefits = async (dni) => {
  try {
    const conn = await getConnection();
    return await conn.query(`SELECT imei,phone_number,device,description,replacements,entry_date,mount,fixed,paid_out,retired,idbenefits FROM clients c INNER JOIN benefits b ON 
    c.dni = b.dni WHERE c.dni = ${dni}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateChecks = async (id, columnName) => {
  try {
    const conn = await getConnection();
    return await conn.query(`UPDATE benefits b
    SET b.${columnName} = true
    WHERE b.idbenefits = ${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getChaves = async () => {
  try {
    const response = await axios.get("http://localhost:3000/chave");

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  getClient,
  saveClient,
  saveBenefit,
  getBenefits,
  updateChecks,
  getChaves,
};
