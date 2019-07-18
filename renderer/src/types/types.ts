import { Action } from "easy-peasy";

export interface StoreType {
    terminalConfig : {
        loadSuccess : boolean ,
        loadFail : boolean , 
        configFilePath : string , 
    }
    globals : TerminalGlobals ,
    profiles : TerminalProfile[] ,
    schemes : TerminalColorScheme[]

    setLoadFail : Action<StoreType,boolean> , 
    setLoadSuccess : Action<StoreType,boolean> ,
    setConfigFilePath : Action<StoreType,string> , 
    setGlobals: Action<StoreType,TerminalGlobals> , 
    setProfiles: Action<StoreType,TerminalProfile[]> , 
    setSchemes: Action<StoreType,TerminalColorScheme[]> , 
}
export interface WindowsTerminalConfigType{
    globals : TerminalGlobals ,
    profiles : TerminalProfile[] ,
    schemes : TerminalColorScheme[]
}

export enum ImageStretchMode{
    Fill = 'Fill' ,
    Fit ='Fit' , 
    Stretch = 'Stretch' , 
    Tile = 'Tile' , 
    Center = 'Center' , 
    Span = 'Span'
}

export enum CursorShape{
    bar ='bar' , 
    emptyBox = 'emptyBox' , 
    filledBox = 'filledBox' , 
    underScore = 'underScore' , 
    vintage = 'vintage'
}

export interface TerminalProfile{
    acrylicOpacity? : number ,
    background? : string,
    backgroundImage? : string,
    backgroundImageOpacity ? : number,
    backgroundImageStretchMode? : ImageStretchMode
    closeOnExit? : boolean,
    colorScheme? : string,
    commandline? : string ,
    cursorColor? : string,
    cursorShape? : CursorShape , 
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
        alwaysShowTabs : boolean,
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
    terminalConfigChange = 'terminal-config-change' ,
    terminalConfigPath = 'terminal-config-path' ,
}