const { app, BrowserWindow, Menu, ipcMain,dialog } = require('electron');
const ProgressBar = require('electron-progressbar');
const appMenu = require('./menu');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpeg_static = require('ffmpeg-static-electron');
const ffprobe_static = require('ffprobe-static-electron'); 


ffmpeg.setFfmpegPath(ffmpeg_static.path);
ffmpeg.setFfprobePath(ffprobe_static.path)



let mainWindow=null

app.on('ready', () => {
    console.log("Application is ready");

    mainWindow = new BrowserWindow({
        width:1000,
        height:605,
        webPreferences: {
            nodeIntegration: true,//default false
            contextIsolation: false,//default true

        }
    });
     mainWindow.loadFile('index.html')    
      
});

ipcMain.on('convertVideo',(event,videoPath, format) => {    
    let options = { 
        title: 'Save video',
        defaultPath: path.format({
            dir: path.dirname(videoPath),
            name: path.basename(videoPath, path.extname(videoPath)),
            ext: `.${format}`
        }),
        buttonLabel: 'Save',
        filters: [{ name: 'Videos', extensions: [format] }]
    };

    dialog.showSaveDialog(mainWindow, options)
        .then((saveFile) => {
            if (saveFile.canceled) {
                console.log('User cancelled the save dialog');
                return;
            }

            let outputPath = saveFile.filePath;

            var progressBar = new ProgressBar({
                indeterminate: false,
                text: 'Video conversion in progress',
                detail: 'converting progress',
                title:'converting progress',
                browserWindow:{
                    parent: mainWindow
                },
                maxValue: 100 
              });
        
            //progress bar events
            progressBar
                .on('completed', function() {
                    console.info(`completed...`);
                    progressBar.detail = 'Task completed. Exiting...';
                    event.sender.send('progressCompleted', `progressCompleted`);
            
                })
                .on('aborted', function(value) {
                    console.info(`aborted... ${value}`);
                })
                .on('progress', function(value) {
                    progressBar.detail = `Value ${value} out of ${progressBar.getOptions().maxValue}...`;
                });

            ffmpeg(videoPath)
                .toFormat(format)
                .on('progress', function(progress) {
                    console.log(progress);
                    if (progressBar) {
                        progressBar.value = progress.percent;
                        progressBar.detail = `${progress.percent.toFixed(2)}% completed`;
                    }
                      })
                .on('error', err => console.error(err))
                .on('end', () => console.log(`Conversion to ${format} finished!`))
                .save(outputPath);
        });
})


   Menu.setApplicationMenu(appMenu);