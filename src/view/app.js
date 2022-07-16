const { remote } = require("electron");
const main = remote.require("./main");

async function init() {
  const a = await main.getDnis();
  const b = await main.saveClients();
  console.log(a);
  return b;
}

init();
