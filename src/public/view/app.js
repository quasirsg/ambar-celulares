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
async function getDni() {
  return await main.getDni();
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
async function getBenefits(dni) {
  return await main.getBenefits(dni);
}

async function updateChecks(id, columnName) {
  return await main.updateChecks(id, columnName);
}

async function updateMount(id, mount) {
  return await main.updateMount(id, mount);
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
