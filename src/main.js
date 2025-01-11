const { generateUrl } = require("./backend/qr");
const { getConnection } = require("./database");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
const axios = require("axios").default;

const getClient = async (dni) => {
  try {
    const conn = await getConnection();
    const results = await conn.query(
      `SELECT * FROM clients c WHERE c.dni = ${dni}`
    );
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllDnis = async () => {
  try {
    const conn = await getConnection();
    const resultsDni = await conn.query("SELECT dni FROM clients");
    return resultsDni;
  } catch (error) {
    throw error
  }
}

const getAllClients = async (page, limit) => {
  try {
    const conn = await getConnection();
    const offset = (page - 1) * limit;
    const resultsClients = await conn.query(`SELECT * FROM clients LIMIT ${limit} OFFSET ${offset}`);
    return resultsClients;
  } catch (error) {
    throw error
  }
}

const getTotalClients = async () => {
  try {
    const conn = await getConnection();
    const resultsCountClients = await conn.query(`SELECT COUNT(*) as total FROM ambar.clients `);
    return resultsCountClients;
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

const getBenefits = async (dni, page, limit, filter = {}) => {
  try {
    const conn = await getConnection();
    const offset = (page - 1) * limit;
    let query = `
        SELECT imei, device, problem, date_received_phone, brand, total_amount_for_service, deposited_money, fixed, retired, idbenefits, observations, date_fixed
        FROM ambar.clients c
        INNER JOIN ambar.benefits b ON c.dni = b.dni
        WHERE c.dni = ?
    `;
    let params = [dni];

    // Depuración de los filtros
    const filterParams = [];
    if (filter.imei) {
      query += ` AND b.imei LIKE ?`;
      filterParams.push(`%${filter.imei}%`);
    }

    if (filter.date_received_phone) {
      query += ` AND b.date_received_phone LIKE ?`;
      filterParams.push(`%${filter.date_received_phone}%`);
    }

    // Concatenar los filtros a los parámetros principales
    params = [...params, ...filterParams];

    query += ` ORDER BY idbenefits DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const benefits = await conn.query(query, params);
    return benefits;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const getTotalBenefits = async (dni, filter = {}) => {
  try {
    const conn = await getConnection();
    let query = `SELECT COUNT(*) as total 
                  FROM ambar.clients c 
                  INNER JOIN ambar.benefits b 
                  ON c.dni = b.dni 
                  WHERE c.dni = ?`;
    let params = [dni];

    if (filter.imei) {
      query += ` AND b.imei LIKE ?`;
      params.push(filter.imei);
    }

    if (filter.date_received_phone) {
      query += ` AND b.date_received_phone LIKE ?`;
      params.push(`%${filter.date_received_phone}%`);
    }

    const countBenefits = await conn.query(query, params);
    return countBenefits;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getPhoneBrands = async () => {
  try {
    const conn = await getConnection();
    const brands = await conn.query('SELECT name FROM brands');
    return brands;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const updateTotalAmount = async (id, totalAmount) => {
  try {
    const conn = await getConnection();
    return await conn.query(`UPDATE benefits b
    SET b.total_amount_for_service = ${totalAmount}
    WHERE b.idbenefits = ${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateDepositedMoney = async (id, depositedMoney) => {
  try {
    const conn = await getConnection();
    return await conn.query(`UPDATE benefits b
    SET b.deposited_money = ${depositedMoney}
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

const updateObservationsAndDateFixed = async (observation, dateFixed, id) => {
  try {
    const conn = await getConnection();
    return await conn.query(
      `UPDATE benefits b
       SET b.observations = ?, b.date_fixed = ?
       WHERE b.idbenefits = ?`,
      [observation, dateFixed, id]
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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
  getAllDnis,
  getAllClients,
  getTotalClients,
  saveClient,
  saveBenefit,
  getBenefits,
  getTotalBenefits,
  getPhoneBrands,
  updateTotalAmount,
  updateDepositedMoney,
  updateChecks,
  updateObservationsAndDateFixed,
  verifyUser,
  validateToken,
  get2faUser,
  generateQr,
  save2faUserInLocalStorage,
  get2faUserInLocalStorage,
};
