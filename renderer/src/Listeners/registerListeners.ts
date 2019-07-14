import { IpcRenderer, IpcMessageEvent } from "electron";
import { Channels } from "../types/types";
import store from "../store/store";

const electron = window.require('electron') ; 
const ipcRenderer : IpcRenderer = electron.ipcRenderer

const registerListeners = ()=>{
    ipcRenderer.on( Channels.configLoadSuccess , (event:IpcMessageEvent , args:any)=>{
        console.log(args);
        store.getActions().setLoadSuccess(true) ;         
        store.getActions().setLoadFail(false) ;         
    })
    
    ipcRenderer.on( Channels.configLoadFail , (event:IpcMessageEvent , args:any)=>{
        console.log(args);
          store.getActions().setLoadFail(true) ; 
          store.getActions().setLoadSuccess(false) ; 
    })
}

export {registerListeners} ; 