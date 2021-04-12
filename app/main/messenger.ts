import {BrowserWindow} from 'electron'; 




const sendConfigLoadSuccess = (window : BrowserWindow , configObject : any )=>{
    window.webContents.send('config-load-success' , configObject  ) ; 
}

const sendConfigLoadFailure = (window : BrowserWindow , errormsg : string )=>{
    window.webContents.send('config-load-fail' , errormsg ) ; 
}

const sendConfigChangeSuccess= (window : BrowserWindow , msg : string )=>{
    window.webContents.send('terminal-config-change-success' , msg ) ; 
}

export {sendConfigLoadSuccess , sendConfigLoadFailure , sendConfigChangeSuccess} ; 