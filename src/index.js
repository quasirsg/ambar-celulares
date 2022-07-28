const { app, BrowserWindow } = require("electron");

require("./server");
require("./main");
require("electron-reload")(__dirname);

(async function main() {
  await app.whenReady();

  const browserWindow = new BrowserWindow({
    width: 1360,
    height: 760,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      allowRendererProcessReuse: true,
    },
  });

  browserWindow.loadFile("src/public/view/index.html");
  browserWindow.webContents.openDevTools();

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
