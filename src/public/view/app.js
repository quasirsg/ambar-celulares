const { remote } = require("electron");
const main = remote.require("./main");

/* ----------------------------
  Client
---------------------------- */
/**
 * este metodo devuelve un cliente de la base de datos a partir de un dni
 * @param {String} dni
 * @return {ClientObject}
 */
async function getClient(dni) {
  return await main.getClient(dni);
}

/**
 * este metodo guarda la informacion de un nuevo cliente en la db
 * @param {Object} client
 */
async function saveClient(client) {
  await main.saveClient(client);
}

/**
 * este metodo devuelve todos los dni registrados en la db
 * @returns {DniObject}
 */
async function getAllDnis() {
  return await main.getAllDnis();
}

async function getAllClientsOrFiltered(page, limit, searchType, searchValue) {
  return await main.getAllClientsOrFiltered(page, limit, searchType, searchValue);
}

async function getTotalClients(searchType, searchValue) {
  return await main.getTotalClients(searchType, searchValue);
}

async function updateClientField(dni, field, newValue) {
  return await main.updateClientField(dni, field, newValue);
}

async function deleteClientByDni(dni) {
  return await main.deleteClientByDni(dni);
}

/* ----------------------------
  Benefit and BenefitDataTable
---------------------------- */
/**
 * este metodo guarda la informacion de una nueva benefit en la db
 * @param {Object} benefit
 */
async function saveBenefit(benefit) {
  await main.saveBenefit(benefit);
}

/**
 * este metodo devuelve todos los benefit de un cliente a partir de su dni
 * @param {String} dni
 * @returns {BenefitObject}
 */
async function getBenefits(dni, page, limit, filter) {
  return await main.getBenefits(dni, page, limit, filter);
}

/* async function getAllBenefitsByDni(dni) {
  return await main.getAllBenefitsByDni(dni);
} */

async function getTotalBenefits(dni, filter) {
  return await main.getTotalBenefits(dni, filter);
}

async function getPhoneBrands() {
  return await main.getPhoneBrands();
}

async function updateChecks(id, columnName) {
  return await main.updateChecks(id, columnName);
}

async function updateTotalAmount(id, totalAmount) {
  return await main.updateTotalAmount(id, totalAmount);
}

async function updateDepositedMoney(id, depositedMoney) {
  return await main.updateDepositedMoney(id, depositedMoney);
}

async function updateObservationsAndDateFixed(observation, dateFixed, id) {
  return await main.updateObservationsAndDateFixed(observation, dateFixed, id);
}

/* ----------------------------
  2fa
---------------------------- */
async function verifyUser(userId, token) {
  return await main.verifyUser(userId, token);
}

async function get2faUser() {
  return await main.get2faUser();
}

async function validateToken(userId, token) {
  return await main.validateToken(userId, token);
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
