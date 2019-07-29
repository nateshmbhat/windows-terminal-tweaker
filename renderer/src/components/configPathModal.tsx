import React, { useState } from 'react'
import { Modal, Input, Button, Message } from 'semantic-ui-react';
import { IpcRenderer } from 'electron';
import { useStoreState, useStoreActions } from '../store/store';
import { Channels } from '../types/types';
const electron = window.require('electron');
const fs = window.require('fs');
let ipcRenderer: IpcRenderer = electron.ipcRenderer;


const ConfigPathModal = () => {
    const [errorflag, seterrorflag] = useState(true);
    const [loadFail, configpath,] = useStoreState(state => [state.terminalConfig.loadFail, state.terminalConfig.configFilePath]);
    const setConfigFilePath = useStoreActions(actions => actions.setConfigFilePath)

    return (
        <Modal basic size={'small'} closeIcon open={loadFail} onClose={
            () => { console.log("close") }
        }>
            <Modal.Header >Warning ! </Modal.Header>
            <Modal.Content >
                <Message error >
                    <h3>Failed to load the terminal configuration file. Make sure that you install Windows Terminal in the default location or specify the path for the settings file below (The settings file path can be obtained by opening the terminal and clicking the settings button which opens the 'profiles.json' file. Enter the full path for the 'profiles.json' file in the box below ).</h3>
                </Message>
                <Input error={errorflag} value={configpath} fluid onChange={(e) => {
                    setConfigFilePath(e.target.value);
                }} type="text" name="configpath" id="configpath" />
            </Modal.Content>
            <Modal.Actions>
                <Button positive icon='checkmark' labelPosition='right' content='Proceed'
                    onClick={e => {
                        let newerrorflag = false;
                        if (configpath.length == 0) newerrorflag = true;
                        if (!newerrorflag) ipcRenderer.send(Channels.terminalConfigPath, configpath)
                        seterrorflag(newerrorflag);
                    }
                    }
                />
            </Modal.Actions>
        </Modal>
    );
}

export default ConfigPathModal; 