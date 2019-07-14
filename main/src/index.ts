import { BrowserWindow , app , ipcMain, IpcMessageEvent } from 'electron' ; 
import * as isDev from "electron-is-dev" ; 
import * as path from 'path'
import { readFile } from 'fs';
import { sendConfigLoadFailure, sendConfigLoadSuccess } from './messenger';

let mainWindow : BrowserWindow ;


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

    ipcMain.on('terminal-config-path' , (event : IpcMessageEvent , msg: any)=>{
        console.log(msg) ; 
        readFile(msg,(err , data)=>{
            if(err){
                console.log(err);
                sendConfigLoadFailure(mainWindow , err.message);
            }
            else{
                const jsondata = JSON.parse(data.toString()) ;
                sendConfigLoadSuccess(mainWindow , jsondata ) ;
            }
        })
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