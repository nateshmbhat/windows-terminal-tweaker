import { BrowserWindow } from "electron";
import { ElectronStoreTypes } from "./types";

export const registerWindowCallbacks = (mainWindow: BrowserWindow, store: any) => {

    mainWindow.on("closed", () => (mainWindow.destroy()));
    mainWindow.on('ready-to-show', () => { mainWindow.show() });
    mainWindow.on('close', () => {
        store.set(ElectronStoreTypes.windowX, mainWindow.getPosition()[0])
        store.set(ElectronStoreTypes.windowY, mainWindow.getPosition()[1])
        store.set(ElectronStoreTypes.windowHeight, mainWindow.getSize()[1])
        store.set(ElectronStoreTypes.windowWidth, mainWindow.getSize()[0])
    })
}