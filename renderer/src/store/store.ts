import { createStore, action, State, Action } from 'easy-peasy'
import { StoreType, CursorShape, RequestedThemeOptions, ImageStretchMode } from '../types/types';
import { sendTerminalConfigChange } from '../ListenersAndComms/messageSender';
import { defaultGlobals, defaultSchemesArray } from './initialStateObjects';


export const initialState: StoreType = {
    terminalConfig: {
        configFilePath: '',
        loadFail: false,
        loadSuccess: false,
    },
    globals: defaultGlobals ,
    profiles: [
        {
            backgroundImageStretchMode: ImageStretchMode.Fill,
            "acrylicOpacity": 0.5,
            "background": "#012456",
            "closeOnExit": true,
            "colorScheme": "Campbell",
            "commandline": "powershell.exe",
            "cursorColor": "#FFFFFF",
            "cursorShape": CursorShape.bar,
            "fontFace": "Consolas",
            "fontSize": 10,
            "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
            "historySize": 9001,
            "icon": "ms-appx:///ProfileIcons/{61c54bbd-c2c6-5271-96e7-009a87ff44bf}.png",
            "name": "Windows PowerShell",
            "padding": "0, 0, 0, 0",
            "snapOnInput": true,
            "startingDirectory": "%USERPROFILE%",
            "useAcrylic": false
        },
        {
            "acrylicOpacity": 0.5,
            "background": "#012456",
            "closeOnExit": true,
            "colorScheme": "Campbell",
            "commandline": "cmd.exe",
            "cursorColor": "#FFFFFF",
            "cursorShape": CursorShape.bar,
            "fontFace": "Consolas",
            "fontSize": 10,
            "guid": "{1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed}",
            "historySize": 9001,
            "icon": "ms-appx:///ProfileIcons/{61c54bbd-c2c6-5271-96e7-009a87ff44bf}.png",
            "name": "New Profile",
            "padding": "0, 0, 0, 0",
            "snapOnInput": true,
            "startingDirectory": "%USERPROFILE%",
            "useAcrylic": false
        }
    ],
    schemes: defaultSchemesArray ,

    setLoadFail: action((state, value) => {
        state.terminalConfig.loadFail = value;
    }),
    setConfigFilePath: action((state, path) => {
        state.terminalConfig.configFilePath = path;
    }),
    setLoadSuccess: action((state, value) => {
        state.terminalConfig.loadSuccess = value;
    }),

    setGlobals: action((state, globals) => {
        state.globals = globals
        sendTerminalConfigChange({ profiles: state.profiles, schemes: state.schemes, globals: globals })
    }),
    setProfiles: action((state, profiles) => {
        state.profiles = profiles;
        sendTerminalConfigChange({ profiles: profiles, schemes: state.schemes, globals: state.globals })
    }),

    setSpecificProfile: action((state, object) => {
        for (let i = 0; i < state.profiles.length; i++) {
            if (state.profiles[i].guid === object.id) {
                state.profiles[i] = object.profile;
            }
        }
        sendTerminalConfigChange({ profiles: state.profiles, schemes: state.schemes, globals: state.globals })
    }),
    setSchemes: action((state, schemes) => {
        state.schemes = schemes;
        sendTerminalConfigChange({ profiles: state.profiles, schemes: schemes, globals: state.globals })
    }),
    setSpecificScheme: action((state, scheme) => {
        for (let i = 0; i < state.profiles.length; i++) {
            if (state.schemes[i].name === scheme.name) {
                state.schemes[i] = scheme
            }
        }
        sendTerminalConfigChange({ profiles: state.profiles, schemes: state.schemes, globals: state.globals })
    })
}



const store = createStore(initialState);

export const useStoreActions = store.useStoreActions;
export const useStoreDispatch = store.useStoreDispatch;
export const useStoreState = store.useStoreState;

export default store;