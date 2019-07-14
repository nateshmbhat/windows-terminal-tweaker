import {ipcMain, BrowserWindow} from 'electron'; 




const sendConfigLoadSuccess = (window : BrowserWindow , configObject : any )=>{
    window.webContents.send('config-load-success' , configObject  ) ; 
}

const sendConfigLoadFailure = (window : BrowserWindow , errormsg : string )=>{
    window.webContents.send('config-load-fail' , errormsg ) ; 
}

export {sendConfigLoadSuccess , sendConfigLoadFailure} ; 