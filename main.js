const { app, BrowserWindow } = require('electron')
const devMode = true;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    if (devMode) win.webContents.openDevTools();
    win.loadFile('./src/app.html')
}

app.whenReady().then(() => {
    createWindow()
})