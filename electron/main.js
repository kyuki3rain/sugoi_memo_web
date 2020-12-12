"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const ipc_main_handler_1 = require("./ipc-main-handler");
const Store = require("electron-store");
const fs = require("fs");
const minimist = require("minimist");
let argv = process.argv;
if (argv[0].endsWith('lectron')) {
    argv.shift();
}
const args = minimist(argv.slice(1));
function createWindow() {
    // Create the browser window. 
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });
    const store = new Store();
    if (args._.length === 1) {
        store.set("file_name", args._[0]);
        const text = readFile(args._[0]);
        store.set("text", text);
    }
    ipc_main_handler_1.initIpcMain(store);
    if (isDev) {
        win.loadURL("http://localhost:3000/index.html");
    }
    else {
        // 'build/index.html'
        win.loadURL(`file://${__dirname}/../index.html`);
    }
    // Hot Reloading
    if (isDev) {
        // 'node_modules/.bin/electronPath'
        require("electron-reload")(__dirname, {
            electron: path.join(__dirname, "..", "..", "node_modules", ".bin", "electron"),
            forceHardReset: true,
            hardResetMethod: "exit",
        });
    }
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools();
    }
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(() => {
    createWindow();
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function readFile(path) {
    fs.readFile(path, (error, data) => {
        if (error != null) {
            return "";
        }
        return data.toString();
    });
}
//# sourceMappingURL=main.js.map