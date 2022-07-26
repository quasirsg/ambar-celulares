const { remote } = require("electron");
const main = remote.require("./main");

async function getDnis() {
  return await main.getDnis();
}

async function saveClient(client) {
  await main.saveClient(client);
}

async function getBenefits(dni) {
  return await main.getBenefits(dni);
}
