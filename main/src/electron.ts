import { BrowserWindow, app, ipcMain, IpcMessageEvent } from 'electron';
import * as isDev from "electron-is-dev";
import * as path from 'path'
import { readFile, writeFile, readdir } from 'fs';
import { sendConfigLoadFailure, sendConfigLoadSuccess } from './messenger';
import * as os from 'os';
import { Channels, ElectronStoreTypes } from './types';
import { registerWindowCallbacks } from './registerWindowCallbacks';

const Store = require('electron-store');

let mainWindow: BrowserWindow;
let terminalConfigFilePath: string | undefined = undefined
let terminalConfigFileData: string | undefined = undefined

const store = new Store();

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}


const readTerminalConfigFile = () => {
    readdir(`${os.homedir()}/AppData/Local/Packages`, (err, files) => {

        if (err) {
            console.log("Error : ", err);
            return;
        }

        files.forEach(file => {
            if (file.match('Microsoft.WindowsTerminal_.*')) {
                console.log("MATCH FOUND = ", file);
                terminalConfigFilePath = `${os.homedir()}/AppData/Local/Packages/${file}/RoamingState/profiles.json`
                store.set(ElectronStoreTypes.configFilePath, terminalConfigFilePath)
                return;
            }
            console.log(file);
        });

        if (terminalConfigFilePath != undefined) {
            readFile(terminalConfigFilePath,
                (err, data) => {
                    if (err) {
                        console.log("Error reading profiles.json : ", err);
                    }
                    terminalConfigFileData = data.toString();
                    console.log("Profiles.json : \n", terminalConfigFileData);
                })
        }
    });
}


function createWindow() {

    readTerminalConfigFile();

    if (isDev) {
        BrowserWindow.addDevToolsExtension(
            path.join('C:\\Users\\Natesh\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd\\2.17.0_0')
        )
    }

    mainWindow = new BrowserWindow({
        width: store.get(ElectronStoreTypes.windowWidth),
        height: store.get(ElectronStoreTypes.windowHeight),
        x: store.get(ElectronStoreTypes.windowX),
        y: store.get(ElectronStoreTypes.windowY),
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        },
        hasShadow: true,
        title: 'Terminal Tweaker',
        show: false,
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    registerWindowCallbacks(mainWindow , store) ; 


    mainWindow.setMenuBarVisibility(false);
    ipcMain.on(Channels.terminalConfigPath, (event: IpcMessageEvent, msg: any) => {
        console.log('terminal config path : ', msg);
        readFile(msg, (err, data) => {
            if (err) {
                console.log('Error : ', err);
                sendConfigLoadFailure(mainWindow, err.message);
            }
            else {
                terminalConfigFilePath = msg;
                const jsondata = JSON.parse(data.toString());
                sendConfigLoadSuccess(mainWindow, jsondata);
            }
        })
    })

    ipcMain.on(Channels.getTerminalConfigData, (event: IpcMessageEvent) => {
        console.log('Get terminal config data : ');
        sendConfigLoadSuccess(mainWindow, terminalConfigFileData);
    })

    ipcMain.on(Channels.terminalConfigChange, (event: IpcMessageEvent, config: string) => {
        if (terminalConfigFilePath == undefined) {
            console.log("Error ! Terminal config path undefined ! ");
            return;
        }

        if (terminalConfigFilePath != undefined) {
            writeFile(terminalConfigFilePath, config, null, (err) => {
                if (err) console.log("Error writing to File : ", err);
                else terminalConfigFileData = config;
            });
        }
    })
}



app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});