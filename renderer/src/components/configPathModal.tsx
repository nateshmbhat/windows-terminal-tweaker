import React, { useState } from 'react'
import { Modal, Input, Button } from 'semantic-ui-react';
import { IpcRenderer } from 'electron';
import { useStoreState, useStoreActions } from '../store/store';
const electron  = window.require('electron') ; 
const fs = window.require('fs') ; 
let ipcRenderer : IpcRenderer  = electron.ipcRenderer ;


const ConfigPathModal = () => {
    const [errorflag , seterrorflag] = useState(false) ; 
    const [loadSuccess,configpath] = useStoreState(state=>[state.terminalConfig.loadSuccess,state.terminalConfig.configFilePath]) ; 
    const setConfigFilePath = useStoreActions(actions=>actions.setConfigFilePath)
    
    return (
        <Modal basic size={'small'} closeIcon open={!loadSuccess} onClose={
            ()=>{console.log("close")}
        } >
            <Modal.Header>Enter the file path for Windows Terminal Config file (profiles.json) </Modal.Header>
            <Modal.Content>
                <Input error={errorflag} value={configpath} fluid onChange={(e) => { 
                    setConfigFilePath(e.target.value) ; 
                }} type="text" name="configpath" id="configpath" />
            </Modal.Content>
            <Modal.Actions>
               <Button positive icon='checkmark' labelPosition='right' content='Proceed'
                onClick={e => { 
                        let newerrorflag = false ; 
                        if(configpath.length==0) newerrorflag = true ; 
                        if(!newerrorflag) ipcRenderer.send('terminal-config-path', configpath)
                        seterrorflag(newerrorflag) ; 
                    }
                }
                />
            </Modal.Actions>
        </Modal>
    );
}

export default ConfigPathModal; 