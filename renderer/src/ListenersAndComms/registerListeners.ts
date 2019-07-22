import { IpcRenderer, IpcMessageEvent } from "electron";
import { Channels, WindowsTerminalConfigType } from "../types/types";
import store from "../store/store";

const electron = window.require('electron') ; 
const ipcRenderer : IpcRenderer = electron.ipcRenderer

const registerListeners = ()=>{
    ipcRenderer.on( Channels.configLoadSuccess , (event:IpcMessageEvent , args:string)=>{
        let terminalConfigObject : WindowsTerminalConfigType = JSON.parse(args) ; 
        console.log(terminalConfigObject) ; 
        const actions = store.getActions() ; 

        const {setLoadSuccess , setLoadFail , setGlobals , setProfiles , setSchemes}  = actions ; 

        setGlobals(terminalConfigObject.globals)
        setProfiles(terminalConfigObject.profiles)
        setSchemes(terminalConfigObject.schemes) ;

        setLoadSuccess(true) ;         
        setLoadFail(false) ;         
    })

    ipcRenderer.on( Channels.configLoadFail , (event:IpcMessageEvent , args:any)=>{
        console.log(args);
          store.getActions().setLoadFail(true) ; 
          store.getActions().setLoadSuccess(false) ; 
    })

    
}

export {registerListeners} ; 