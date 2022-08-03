const { remote } = require("electron");
const main = remote.require("./main");

async function getClient(dni) {
  return await main.getClient(dni);
}

async function saveClient(client) {
  await main.saveClient(client);
}

async function getBenefits(dni) {
  return await main.getBenefits(dni);
}

async function updateChecks(id, columnName) {
  return await main.updateChecks(id, columnName);
}

async function getChaves() {
  return await main.getChaves();
}

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
