require("electron-reload")(__dirname);

const { app, BrowserWindow } = require("electron");
const path = require("path");
const os = require("os");

(async function main() {
  await app.whenReady();

  const browserWindow = new BrowserWindow({
    width: 1360,
    height: 760,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  browserWindow.loadFile("src/view/index.html");

  app.allowRendererProcessReuse = true;
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
})();
