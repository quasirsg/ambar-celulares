const { remote } = require("electron");
const main = remote.require("./main");

async function getDnis() {
  try {
    return await main.getDnis();
  } catch (error) {
    console.log(error);
  }
}

async function saveClient(client) {
  await main.saveClient(client);
}
