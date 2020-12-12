"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("myAPI", {
    loadText: () => electron_1.ipcRenderer.invoke("load-text"),
    readDir: () => electron_1.ipcRenderer.invoke("read-dir"),
    save: (str) => electron_1.ipcRenderer.invoke("save", str),
});
//# sourceMappingURL=preload.js.map