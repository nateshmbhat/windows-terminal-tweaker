"use strict";
exports.__esModule = true;
var sendConfigLoadSuccess = function (window, configObject) {
    window.webContents.send('config-load-success', configObject);
};
exports.sendConfigLoadSuccess = sendConfigLoadSuccess;
var sendConfigLoadFailure = function (window, errormsg) {
    window.webContents.send('config-load-fail', errormsg);
};
exports.sendConfigLoadFailure = sendConfigLoadFailure;
var sendConfigChangeSuccess = function (window, msg) {
    window.webContents.send('terminal-config-change-success', msg);
};
exports.sendConfigChangeSuccess = sendConfigChangeSuccess;
