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
