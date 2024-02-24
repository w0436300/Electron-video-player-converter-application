const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const ProgressBar = require('electron-progressbar');
const appMenu = require('./menu');


mainWindow=null

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
    
      
});



// ipcMain.on('startProgress', (event)=>{

//     //instantiatinng our progress bar
//     var progressBar = new ProgressBar({
//         indeterminate: false,
//         text: 'Preparing data...',
//         detail: 'My progress',
//         title:'My progress',
//         browserWindow:{
//             parent: mainWindow
//         }
//       });

//     //progress bar events
//     progressBar
//     .on('completed', function() {
//       console.info(`completed...`);
//       progressBar.detail = 'Task completed. Exiting...';
//       event.sender.send('progressCompleted', `progressCompleted`);

//     })
//     .on('aborted', function(value) {
//       console.info(`aborted... ${value}`);
//     })
//     .on('progress', function(value) {
//       progressBar.detail = `Value ${value} out of ${progressBar.getOptions().maxValue}...`;
//     });
  
//   // launch a task and increase the value of the progress bar for each step completed of a big task;
//   // the progress bar is set to completed when it reaches its maxValue (default maxValue: 100);
//   // ps: setInterval is used here just to simulate the progress of a task
//   setInterval(function() {
//     if(!progressBar.isCompleted()){
//       progressBar.value += 1;

//       if(progressBar.value >= 50) {
//         progressBar.value += 1;
//       }
//     }
//   }, 20)

// })


   Menu.setApplicationMenu(appMenu);