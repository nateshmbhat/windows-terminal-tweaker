import { Action } from "easy-peasy";
import { RegexLiteral } from "@babel/types";

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
    setSpecificProfile : Action<StoreType,{profile : TerminalProfile , id : string } > , 
    setSchemes: Action<StoreType,TerminalColorScheme[]> , 
    setSpecificScheme: Action<StoreType,TerminalColorScheme> , 
    setSpecificKeyBinding : Action<StoreType,{command : string , keys : [string]}> 
}
export enum MessageTypes {
    error='error' , 
    warning='warning' , 
    info='info'
}

export enum NavLinkPaths {
    schemes = '/config/schemes' , 
    profiles = '/config/profiles' , 
    globals = '/config/globals' , 
    home = '/'
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

export enum CursorShapeToIcon {
    bar ='┃' , 
    emptyBox = '▯' , 
    filledBox = '█' , 
    underscore = '▁' , 
    vintage = '▃'
}

export enum CursorShape{
    bar ='bar' , 
    emptyBox = 'emptyBox' , 
    filledBox = 'filledBox' , 
    underscore = 'underscore' , 
    vintage = 'vintage'
}
export enum ScrollBarState{
    visible = 'visible' ,
    hidden ='hidden'
}

const WindowsFilePathRegex : RegExp = /(^([a-z]|[A-Z]):(?=\\(?![\0-\37<>:"/\\|?*])|\/(?![\0-\37<>:"/\\|?*])|$)|^\\(?=[\\\/][^\0-\37<>:"/\\|?*]+)|^(?=(\\|\/)$)|^\.(?=(\\|\/)$)|^\.\.(?=(\\|\/)$)|^(?=(\\|\/)[^\0-\37<>:"/\\|?*]+)|^\.(?=(\\|\/)[^\0-\37<>:"/\\|?*]+)|^\.\.(?=(\\|\/)[^\0-\37<>:"/\\|?*]+))((\\|\/)[^\0-\37<>:"/\\|?*]+|(\\|\/)$)*()$/ ; 

export interface TerminalProfile{
    guid : string , 
    name  : string ,
    acrylicOpacity : number ,
    useAcrylic  : boolean  , 
    closeOnExit : boolean,
    colorScheme : string,
    commandline : string ,
    cursorColor : string,
    cursorShape : CursorShape , 
    fontFace : string ,
    fontSize : number ,
    historySize : number ,
    padding : string  , 
    snapOnInput : boolean,
    icon? : string , 
    startingDirectory ? : string ,
    background? : string,
    colorTable? : string[],
    cursorHeight ? : number , 
    foreground ? : string ,
    scrollbarState ? : ScrollBarState , 
    tabTitle ?: string , 
    backgroundImage? : string,
    backgroundImageOpacity ? : number,
    backgroundImageStretchMode? : ImageStretchMode
}; 

export interface  TerminalColorScheme {
    name  : string,
    foreground  : string,
    background  : string,
    black  : string,
    blue  : string,
    brightBlack  : string,
    brightBlue  : string,
    brightCyan  : string,
    brightGreen  : string,
    brightPurple  : string,
    brightRed  : string,
    brightWhite  : string,
    brightYellow  : string,
    cyan  : string,
    green  : string,
    purple  : string,
    red  : string,
    white  : string,
    yellow  : string ,
}
export interface TerminalKeyBinding {
    command : string , 
    keys : string[] 
}
export enum RequestedThemeOptions{
    system = 'system' , dark = 'dark' , light = 'light'
}

export interface TerminalGlobals {
        alwaysShowTabs : boolean,
        defaultProfile : string , 
        initialCols : number,
        initialRows : number ,
        keybindings : TerminalKeyBinding[] , 
        requestedTheme : RequestedThemeOptions ,  
        showTerminalTitleInTitlebar :boolean 
        showTabsInTitlebar : boolean | undefined ,
        wordDelimiters : string  | undefined
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

export {WindowsFilePathRegex} ;