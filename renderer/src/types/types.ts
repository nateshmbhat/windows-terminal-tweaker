import { Action } from "easy-peasy";

export interface StoreType {
    terminalConfig : {
        loadSuccess : boolean ,
        loadFail : boolean , 
        configFilePath : string , 
    }
    
    setLoadFail : Action<StoreType,boolean> , 
    setLoadSuccess : Action<StoreType,boolean> ,
    setConfigFilePath : Action<StoreType,string> ,
}



export interface TerminalProfile{
    acrylicOpacity? : number ,
    background? : string,
    closeOnExit? : boolean,
    colorScheme? : string,
    commandline? : string ,
    cursorColor? : string,
    cursorShape? : 'bar' | 'emptyBox' | 'filledBox' | 'underScore' | 'vintage' ,
    fontFace? : string ,
    fontSize? : number ,
    guid? : string , 
    historySize? : number ,
    icon? : string , 
    name ? : string ,
    padding? : string  , 
    snapOnInput? : boolean,
    startingDirectory ? : string ,
    useAcrylic ? : boolean  , 
    [key :string] : any
}; 

export interface  TerminalColorScheme {
    background ? : string,
    black ? : string,
    blue ? : string,
    brightBlack ? : string,
    brightBlue ? : string,
    brightCyan ? : string,
    brightGreen ? : string,
    brightPurple ? : string,
    brightRed ? : string,
    brightWhite ? : string,
    brightYellow ? : string,
    cyan ? : string,
    foreground ? : string,
    green ? : string,
    name ? : string,
    purple ? : string,
    red ? : string,
    white ? : string,
    yellow ? : string ,
    [key :string] : any
}
export interface TerminalKeyBinding {
    command : string , 
    keys : string[] 
}

export interface TerminalGlobals {
        alwaysShowTabs : true,
        defaultProfile : string , 
        initialCols : number,
        initialRows : number ,
        keybindings : TerminalKeyBinding[] , 
        requestedTheme : string, // 'system'|'dark'|'light'  . string is @FutureCompatile
        showTabsInTitlebar : boolean ,
        showTerminalTitleInTitlebar :boolean 
}

export interface TerminalConfig{
    globals : TerminalGlobals
    profiles : TerminalProfile[] , 
    schemes : TerminalColorScheme[] , 
}

export enum Channels{
    configLoadSuccess = 'config-load-success' ,
    configLoadFail = 'config-load-fail' ,
}