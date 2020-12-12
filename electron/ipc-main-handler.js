"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initIpcMain = void 0;
const electron_1 = require("electron");
const fs = require("fs");
const initIpcMain = (store) => {
    electron_1.ipcMain.handle("load-text", () => { return store.get("text"); });
    electron_1.ipcMain.handle("read-dir", async () => fs.promises.readdir("./"));
    electron_1.ipcMain.handle("save", (event, str) => {
        store.delete('text');
        store.set("text", str);
    });
};
exports.initIpcMain = initIpcMain;
//# sourceMappingURL=ipc-main-handler.js.map