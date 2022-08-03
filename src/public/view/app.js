const { remote } = require("electron");
const main = remote.require("./main");

async function getClient(dni) {
  return await main.getClient(dni);
}

async function saveClient(client) {
  await main.saveClient(client);
}

async function saveBenefit(benefit) {
  await main.saveBenefit(benefit)
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

async function saveBenefit(benefit) {
  await main.saveBenefit(benefit);
}
