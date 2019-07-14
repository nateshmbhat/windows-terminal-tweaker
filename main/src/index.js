"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var fs_1 = require("fs");
var messenger_1 = require("./messenger");
var os = require('os');
var mainWindow;
function createWindow() {
    if (isDev) {
        electron_1.BrowserWindow.addDevToolsExtension(path.join('C:\\Users\\Natesh\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd\\2.17.0_0'));
    }
    mainWindow = new electron_1.BrowserWindow({ width: 900, height: 680, webPreferences: {
            nodeIntegration: true
        } });
    mainWindow.loadURL(isDev
        ? "http://localhost:3000"
        : "file://" + path.join(__dirname, "../build/index.html"));
    mainWindow.on("closed", function () { return (mainWindow.destroy()); });
    electron_1.ipcMain.on('terminal-config-path', function (event, msg) {
        console.log(msg);
        fs_1.readFile(msg, function (err, data) {
            if (err) {
                console.log(err);
                messenger_1.sendConfigLoadFailure(mainWindow, err.message);
            }
            else {
                var jsondata = JSON.parse(data.toString());
                messenger_1.sendConfigLoadSuccess(mainWindow, jsondata);
            }
        });
    });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
