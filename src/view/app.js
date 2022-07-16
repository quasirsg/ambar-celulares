const { remote } = require("electron");
const main = remote.require("./main");

async function init() {
  const a = await main.getDnis();

  console.log(a);
}

init();
