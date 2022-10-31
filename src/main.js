const { generateUrl } = require("./backend/qr");
const { getConnection } = require("./database");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
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

const getDni = async () => {
  try {
    const conn = await getConnection();
    const resultsDni = await conn.query("SELECT dni FROM clients");
    /* console.log(resultsDni); */
    return resultsDni;
  } catch (error) {
    throw error
  }
}

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
    const benefits =
      await conn.query(`SELECT imei,phone_number,device,description,entry_date,mount,paid,fixed,retired,idbenefits FROM clients c INNER JOIN benefits b ON 
    c.dni = b.dni WHERE c.dni = ${dni}`);
    benefits.forEach((benefit) => (benefit.mount = `$${benefit.mount}`));
    return benefits;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateMount = async (id, mount) => {
  try {
    const conn = await getConnection();
    return await conn.query(`UPDATE benefits b
    SET b.mount = ${mount}
    WHERE b.idbenefits = ${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updatePaid = async (id, paid) => {
  try {
    const conn = await getConnection();
    return await conn.query(`UPDATE benefits b
    SET b.paid = ${paid}
    WHERE b.idbenefits = ${id}`);
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

const get2faUser = async () => {
  try {
    const user2fa = await axios.post("http://localhost:3000/api/register");
    console.log(user2fa);
    return user2fa;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const verifyUser = async (userId, token) => {
  try {
    const verified = await axios.post("http://localhost:3000/api/verify", {
      userId,
      token,
    });
    return verified.data.verified;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const validateToken = async (userId, token) => {
  try {
    const verified = await axios.post("http://localhost:3000/api/validate", {
      userId,
      token,
    });
    return verified.data.validated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const generateQr = async (otpauth_url) => {
  try {
    const url = await generateUrl(otpauth_url);
    return url;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const save2faUserInLocalStorage = (userId) => {
  localStorage.setItem("2fauser", userId);
};

const get2faUserInLocalStorage = () => {
  return localStorage.getItem("2fauser");
};

module.exports = {
  getClient,
  getDni,
  saveClient,
  saveBenefit,
  getBenefits,
  updateMount,
  updatePaid,
  updateChecks,
  verifyUser,
  validateToken,
  get2faUser,
  generateQr,
  save2faUserInLocalStorage,
  get2faUserInLocalStorage,
};
