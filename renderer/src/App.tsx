import React, { useState, useEffect } from 'react';
import { IpcRenderer, IpcMessageEvent} from 'electron' ; 
import {Input, Button} from 'semantic-ui-react' ; 
import ConfigPathModal from './components/ConfigPathModal';
import MainPage from './components/MainPage';
import { registerListeners } from './ListenersAndComms/registerListeners';
import { sendGetTerminalConfigData } from './ListenersAndComms/messageSender';
import mouseTrap from 'mousetrap'; 

declare global {
  interface Window {
    require: any;
  }
}

const electron  = window.require('electron') ; 
let ipcRenderer : IpcRenderer  = electron.ipcRenderer ; 

const App: React.FC = () => {
  useEffect(() => {
    registerListeners() ; 
    sendGetTerminalConfigData() ; 
    mouseTrap.bind(['command+r', 'ctrl+r' , 'ctrl+shift+r' , 'ctrl+k'] , (e, combo )=>{
      console.log("Handling mousetrap keys !" ) ;
      return false ; 
    }) ; 

  },[])
  return (
    <div className="App">
      <MainPage/>
   </div>
  );
}

export default App;
