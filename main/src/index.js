"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var fs_1 = require("fs");
var messenger_1 = require("./messenger");
var types_1 = require("./types");
var mainWindow;
var terminalConfigFilePath = undefined;
terminalConfigFilePath = 'C:\\Users\\Natesh\\AppData\\Local\\Packages\\Microsoft.WindowsTerminal_8wekyb3d8bbwe\\RoamingState\\profiles.json';
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
    electron_1.ipcMain.on(types_1.Channels.terminalConfigPath, function (event, msg) {
        console.log(msg);
        fs_1.readFile(msg, function (err, data) {
            if (err) {
                console.log(err);
                messenger_1.sendConfigLoadFailure(mainWindow, err.message);
            }
            else {
                terminalConfigFilePath = msg;
                var jsondata = JSON.parse(data.toString());
                messenger_1.sendConfigLoadSuccess(mainWindow, jsondata);
            }
        });
    });
    electron_1.ipcMain.on(types_1.Channels.terminalConfigChange, function (event, config) {
        if (terminalConfigFilePath == undefined) {
            console.log("Error ! Terminal config path undefined ! ");
            return;
        }
        fs_1.writeFile(terminalConfigFilePath, config, null, function (err) {
            if (err)
                console.log("Error writing to File : ", err);
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
