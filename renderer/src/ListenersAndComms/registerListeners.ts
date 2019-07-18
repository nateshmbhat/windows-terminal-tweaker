import { IpcRenderer, IpcMessageEvent } from "electron";
import { Channels, WindowsTerminalConfigType } from "../types/types";
import store from "../store/store";

const electron = window.require('electron') ; 
const ipcRenderer : IpcRenderer = electron.ipcRenderer

const registerListeners = ()=>{
    ipcRenderer.on( Channels.configLoadSuccess , (event:IpcMessageEvent , args:WindowsTerminalConfigType)=>{
        console.log(args);
        const actions = store.getActions() ; 

        const {setLoadSuccess , setLoadFail , setGlobals , setProfiles , setSchemes}  = actions ; 

        setLoadSuccess(true) ;         
        setLoadFail(false) ;         
        setGlobals(args.globals)
        setProfiles(args.profiles)
        setSchemes(args.schemes) ;
    })

    ipcRenderer.on( Channels.configLoadFail , (event:IpcMessageEvent , args:any)=>{
        console.log(args);
          store.getActions().setLoadFail(true) ; 
          store.getActions().setLoadSuccess(false) ; 
    })
}

export {registerListeners} ; 