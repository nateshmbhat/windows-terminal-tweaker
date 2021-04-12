import { Channels, WindowsTerminalConfigType } from "../types/types";
import { IpcRenderer } from "electron";
const electron = window.require('electron') ; 
const ipcRenderer :IpcRenderer = electron.ipcRenderer ; 

const sendTerminalConfigChange = (config : WindowsTerminalConfigType)=>{
   ipcRenderer.send(Channels.terminalConfigChange , JSON.stringify(config)) ; 
}

const sendGetTerminalConfigData = ()=>{
   ipcRenderer.send(Channels.getTerminalConfigData) ; 
}


export {sendTerminalConfigChange , sendGetTerminalConfigData} ; 