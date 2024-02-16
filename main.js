const { app, BrowserWindow, ipcMain, Menu } = require('electron');
// const appMenu = require('./menu')
const menu = require('./menu');

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
     const appMenu = menu(mainWindow);
   


   //attach out templatte to the app meun object
    Menu.setApplicationMenu(appMenu);

});





