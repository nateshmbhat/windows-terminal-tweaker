import { BrowserWindow , app , ipcMain, IpcMessageEvent } from 'electron' ; 
import * as isDev from "electron-is-dev" ; 
import * as path from 'path'
import { readFile, writeFile } from 'fs';
import { sendConfigLoadFailure, sendConfigLoadSuccess } from './messenger';
import { Channels } from './types';

let mainWindow : BrowserWindow ;
let terminalConfigFilePath : string|undefined = undefined; 
terminalConfigFilePath = 'C:\\Users\\Natesh\\AppData\\Local\\Packages\\Microsoft.WindowsTerminal_8wekyb3d8bbwe\\RoamingState\\profiles.json'

function createWindow() {

    if(isDev){
        BrowserWindow.addDevToolsExtension(
            path.join('C:\\Users\\Natesh\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd\\2.17.0_0')
        )
    }

    mainWindow = new BrowserWindow({ width: 900, height: 680 ,  webPreferences : {
        nodeIntegration: true,
      } });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );


    mainWindow.on("closed", () => (mainWindow.destroy()));

    ipcMain.on(Channels.terminalConfigPath , (event : IpcMessageEvent , msg: any)=>{
        console.log(msg) ; 
        readFile(msg,(err , data)=>{
            if(err){
                console.log(err);
                sendConfigLoadFailure(mainWindow , err.message);
            }
            else{
                terminalConfigFilePath = msg ; 
                const jsondata = JSON.parse(data.toString()) ;
                sendConfigLoadSuccess(mainWindow , jsondata ) ;
            }
        })
    })

    ipcMain.on(Channels.terminalConfigChange , (event:IpcMessageEvent , config : string )=>{
        if(terminalConfigFilePath==undefined){
            console.log("Error ! Terminal config path undefined ! ") ; 
            return ; 
        }
        writeFile(terminalConfigFilePath , config , null , (err)=>{
            if(err)
                console.log("Error writing to File : " , err) ; 
        }) ; 
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