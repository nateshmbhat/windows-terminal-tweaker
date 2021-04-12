import { BrowserWindow, app, ipcMain} from 'electron';
import * as isDev from "electron-is-dev";
import * as path from 'path'
import { readFile, writeFile, readdir } from 'fs';
import { sendConfigLoadFailure, sendConfigLoadSuccess } from './main/messenger';
import * as os from 'os';
import { Channels, ElectronStoreTypes } from './main/types';
import { registerWindowCallbacks } from './main/registerWindowCallbacks';

const Store = require('electron-store');

const store = new Store();

let mainWindow: BrowserWindow;
let terminalConfigFilePath: string | undefined = store.get(ElectronStoreTypes.configFilePath);
let terminalConfigFileData: string | undefined = undefined

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


const findConfigFilePathForFirstTime = () => {
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
            }
            console.log(file);
        });
    });
}


const readTerminalConfigFile = () => {
    if (terminalConfigFilePath === undefined) {
        findConfigFilePathForFirstTime();
    }

    if (terminalConfigFilePath != undefined) {
        readFile(terminalConfigFilePath,
            (err, data) => {
                if (err) {
                    console.log("Error reading profiles.json : ", err);
                }
                else {
                    terminalConfigFileData = data.toString();
                    console.log("Profiles.json : \n", terminalConfigFileData);
                }
            })
    }
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

    registerWindowCallbacks(mainWindow, store);


    mainWindow.setMenuBarVisibility(false);

    ipcMain.on(Channels.terminalConfigPath, (event, msg) => {
        console.log('terminal config path : ', msg);

        readFile(msg, (err, data) => {
            if (err) {
                console.log('Error : ', err);
                sendConfigLoadFailure(mainWindow, err.message);
            }
            else {
                terminalConfigFilePath = msg;
                terminalConfigFileData = data.toString();
                store.set(ElectronStoreTypes.configFilePath, terminalConfigFilePath);
                console.log('sending load success.');
                sendConfigLoadSuccess(mainWindow, data.toString());
            }
        })
    })

    ipcMain.on(Channels.getTerminalConfigData, (event , _) => {
        console.log('Get terminal config data : ');
        if (terminalConfigFileData != undefined)
            sendConfigLoadSuccess(mainWindow, terminalConfigFileData);
        else sendConfigLoadFailure(mainWindow, 'Failed to get Terminal Configuration');
    })

    ipcMain.on(Channels.terminalConfigChange, (event, config: string) => {
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