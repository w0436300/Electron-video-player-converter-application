const { app, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
    console.log("Application is ready");

    const mainWindow = new BrowserWindow({
        width:1000,
        height:605,
        webPreferences: {
            nodeIntegration: true,//default false
            contextIsolation: false,//default true

        }
    });
    mainWindow.loadFile('index.html')

})