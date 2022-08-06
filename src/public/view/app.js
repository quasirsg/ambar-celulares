const { remote } = require("electron");
const main = remote.require("./main");

//client
/**
 * este metodo devuelve un cliente de la base de datos a partir de un dni
 * @param {String} dni  
 * @return {ClientObject}
 */
async function getClient(dni) {
  return await main.getClient(dni);
}

async function saveClient(client) {
  await main.saveClient(client);
}

// benefit and benefit datatable

async function saveBenefit(benefit) {
  await main.saveBenefit(benefit);
}

async function getBenefits(dni) {
  return await main.getBenefits(dni);
}

async function updateChecks(id, columnName) {
  return await main.updateChecks(id, columnName);
}

// 2fa
async function verifyUser(userId, token) {
  return await main.verifyUser(userId, token);
}

async function get2faUser() {
  return await main.get2faUser();
}

async function generateQr(url) {
  return await main.generateQr(url);
}

function save2faUserInLocalStorage(userId) {
  return main.save2faUserInLocalStorage(userId);
}

function get2faUserInLocalStorage() {
  return main.get2faUserInLocalStorage();
}
