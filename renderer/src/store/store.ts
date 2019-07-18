import { createStore, action, State, Action } from 'easy-peasy'
import { StoreType, CursorShape, RequestedThemeOptions } from '../types/types';
import { sendTerminalConfigChange } from '../ListenersAndComms/messageSender';

const initialState: StoreType = {
    terminalConfig: {
        configFilePath: '',
        loadFail: false,
        loadSuccess: false,
    },
    globals: {
        alwaysShowTabs: true,
        defaultProfile: '{61c54bbd-c2c6-5271-96e7-009a87ff44bf}',
        initialCols: 120,
        initialRows: 30,
        keybindings: [
            {
                "command": "closeTab",
                "keys":
                    [
                        "ctrl+w"
                    ]
            },
            {
                "command": "newTab",
                "keys":
                    [
                        "ctrl+t"
                    ]
            },
            {
                "command": "newTabProfile0",
                "keys":
                    [
                        "ctrl+shift+1"
                    ]
            },
            {
                "command": "newTabProfile1",
                "keys":
                    [
                        "ctrl+shift+2"
                    ]
            },
            {
                "command": "newTabProfile2",
                "keys":
                    [
                        "ctrl+shift+3"
                    ]
            },
            {
                "command": "newTabProfile3",
                "keys":
                    [
                        "ctrl+shift+4"
                    ]
            },
            {
                "command": "newTabProfile4",
                "keys":
                    [
                        "ctrl+shift+5"
                    ]
            },
            {
                "command": "newTabProfile5",
                "keys":
                    [
                        "ctrl+shift+6"
                    ]
            },
            {
                "command": "newTabProfile6",
                "keys":
                    [
                        "ctrl+shift+7"
                    ]
            },
            {
                "command": "newTabProfile7",
                "keys":
                    [
                        "ctrl+shift+8"
                    ]
            },
            {
                "command": "newTabProfile8",
                "keys":
                    [
                        "ctrl+shift+9"
                    ]
            },
            {
                "command": "nextTab",
                "keys":
                    [
                        "ctrl+tab"
                    ]
            },
            {
                "command": "openSettings",
                "keys":
                    [
                        "ctrl+,"
                    ]
            },
            {
                "command": "prevTab",
                "keys":
                    [
                        "ctrl+shift+tab"
                    ]
            },
            {
                "command": "scrollDown",
                "keys":
                    [
                        "ctrl+shift+down"
                    ]
            },
            {
                "command": "scrollDownPage",
                "keys":
                    [
                        "ctrl+shift+pgdn"
                    ]
            },
            {
                "command": "scrollUp",
                "keys":
                    [
                        "ctrl+shift+up"
                    ]
            },
            {
                "command": "scrollUpPage",
                "keys":
                    [
                        "ctrl+shift+pgup"
                    ]
            },
            {
                "command": "switchToTab0",
                "keys":
                    [
                        "alt+1"
                    ]
            },
            {
                "command": "switchToTab1",
                "keys":
                    [
                        "alt+2"
                    ]
            },
            {
                "command": "switchToTab2",
                "keys":
                    [
                        "alt+3"
                    ]
            },
            {
                "command": "switchToTab3",
                "keys":
                    [
                        "alt+4"
                    ]
            },
            {
                "command": "switchToTab4",
                "keys":
                    [
                        "alt+5"
                    ]
            },
            {
                "command": "switchToTab5",
                "keys":
                    [
                        "alt+6"
                    ]
            },
            {
                "command": "switchToTab6",
                "keys":
                    [
                        "alt+7"
                    ]
            },
            {
                "command": "switchToTab7",
                "keys":
                    [
                        "alt+8"
                    ]
            },
            {
                "command": "switchToTab8",
                "keys":
                    [
                        "alt+9"
                    ]
            }
        ],
        requestedTheme: RequestedThemeOptions.system,
        showTabsInTitlebar: true,
        showTerminalTitleInTitlebar: true ,
        wordDelimiters : '` ./\()"\'-:,.;<>~!@#$%^&*'
    },

    profiles: [
        {
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
    schemes: [
        {
            "background": "#0C0C0C",
            "black": "#0C0C0C",
            "blue": "#0037DA",
            "brightBlack": "#767676",
            "brightBlue": "#3B78FF",
            "brightCyan": "#61D6D6",
            "brightGreen": "#16C60C",
            "brightPurple": "#B4009E",
            "brightRed": "#E74856",
            "brightWhite": "#F2F2F2",
            "brightYellow": "#F9F1A5",
            "cyan": "#3A96DD",
            "foreground": "#F2F2F2",
            "green": "#13A10E",
            "name": "Campbell",
            "purple": "#881798",
            "red": "#C50F1F",
            "white": "#CCCCCC",
            "yellow": "#C19C00"
        },
        {
            "background": "#282C34",
            "black": "#282C34",
            "blue": "#61AFEF",
            "brightBlack": "#5A6374",
            "brightBlue": "#61AFEF",
            "brightCyan": "#56B6C2",
            "brightGreen": "#98C379",
            "brightPurple": "#C678DD",
            "brightRed": "#E06C75",
            "brightWhite": "#DCDFE4",
            "brightYellow": "#E5C07B",
            "cyan": "#56B6C2",
            "foreground": "#DCDFE4",
            "green": "#98C379",
            "name": "One Half Dark",
            "purple": "#C678DD",
            "red": "#E06C75",
            "white": "#DCDFE4",
            "yellow": "#E5C07B"
        },
        {
            "background": "#FAFAFA",
            "black": "#383A42",
            "blue": "#0184BC",
            "brightBlack": "#4F525D",
            "brightBlue": "#61AFEF",
            "brightCyan": "#56B5C1",
            "brightGreen": "#98C379",
            "brightPurple": "#C577DD",
            "brightRed": "#DF6C75",
            "brightWhite": "#FFFFFF",
            "brightYellow": "#E4C07A",
            "cyan": "#0997B3",
            "foreground": "#383A42",
            "green": "#50A14F",
            "name": "One Half Light",
            "purple": "#A626A4",
            "red": "#E45649",
            "white": "#FAFAFA",
            "yellow": "#C18301"
        },
        {
            "background": "#073642",
            "black": "#073642",
            "blue": "#268BD2",
            "brightBlack": "#002B36",
            "brightBlue": "#839496",
            "brightCyan": "#93A1A1",
            "brightGreen": "#586E75",
            "brightPurple": "#6C71C4",
            "brightRed": "#CB4B16",
            "brightWhite": "#FDF6E3",
            "brightYellow": "#657B83",
            "cyan": "#2AA198",
            "foreground": "#FDF6E3",
            "green": "#859900",
            "name": "Solarized Dark",
            "purple": "#D33682",
            "red": "#D30102",
            "white": "#EEE8D5",
            "yellow": "#B58900"
        },
        {
            "background": "#FDF6E3",
            "black": "#073642",
            "blue": "#268BD2",
            "brightBlack": "#002B36",
            "brightBlue": "#839496",
            "brightCyan": "#93A1A1",
            "brightGreen": "#586E75",
            "brightPurple": "#6C71C4",
            "brightRed": "#CB4B16",
            "brightWhite": "#FDF6E3",
            "brightYellow": "#657B83",
            "cyan": "#2AA198",
            "foreground": "#073642",
            "green": "#859900",
            "name": "Solarized Light",
            "purple": "#D33682",
            "red": "#D30102",
            "white": "#EEE8D5",
            "yellow": "#B58900"
        }
    ],

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
    })
}


const store = createStore(initialState);

export const useStoreActions = store.useStoreActions;
export const useStoreDispatch = store.useStoreDispatch;
export const useStoreState = store.useStoreState;

export default store;