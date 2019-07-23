import { BrowserWindow, app, ipcMain, IpcMessageEvent } from 'electron';
import * as isDev from "electron-is-dev";
import * as path from 'path'
import { readFile, writeFile, readdir } from 'fs';
import { sendConfigLoadFailure, sendConfigLoadSuccess } from './messenger';
import * as os from 'os';
import { Channels } from './types';

let mainWindow: BrowserWindow;
let terminalConfigFilePath: string = '';
let terminalConfigFileData: string = '';


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
        if (err) console.log("Error : ", err);

        files.forEach(file => {
            if (file.match('Microsoft.WindowsTerminal_.*')) {
                console.log("MATCH FOUND = ", file);
                terminalConfigFilePath = `${os.homedir()}/AppData/Local/Packages/${file}/RoamingState/profiles.json`
                return;
            }
            console.log(file);
        });

        readFile(terminalConfigFilePath,
            (err, data) => {
                if (err) {
                    console.log("Error reading profiles.json : ", err);
                }
                terminalConfigFileData = data.toString();
                console.log("Profiles.json : \n", terminalConfigFileData);
            })
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
        width: 900, height: 680, 
        webPreferences: {
            nodeIntegration: true,
            // devTools : false
        } , 
        hasShadow : true , 
        // show : false , 
        title : 'Terminal Tweaker' , 
        show : false 
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    mainWindow.setMenuBarVisibility(false);

    mainWindow.on("closed", () => (mainWindow.destroy()));
    mainWindow.on('ready-to-show' , ()=>{mainWindow.show()}) ; 

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
        writeFile(terminalConfigFilePath, config, null, (err) => {
            if (err)
                console.log("Error writing to File : ", err);
        });
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