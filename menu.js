const { Menu, dialog } = require('electron');
const isMac = process.platform === 'darwin';
const ffmpeg = require('fluent-ffmpeg');
const ffmpeg_static = require('ffmpeg-static-electron');
const ffprobe_static = require('ffprobe-static-electron'); 
const path = require('path');

ffmpeg.setFfmpegPath(ffmpeg_static.path);
ffmpeg.setFfprobePath(ffprobe_static.path)
let videoPath;
 //MENU Code
//create a menu

//define a new template
const menuTemplate = [ 
    {
        label:"File",
        submenu:[
            {
                label:"Video",
                submenu:[
                    {label:"Load...", 
                     click: (event, parentWindow) => {
                        let dialogOptions = {
                            filters:[
                                      { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
                                      { name: 'All Files', extensions: ['*'] }
                                    ],
                            title:"open file",
                            message:"please choose a valid video"
                        }

                       
                        dialog.showOpenDialog(parentWindow,dialogOptions).then((fileInfo) => {
                                 videoPath=fileInfo.filePaths[0];
                                if (fileInfo.canceled) {
                                    console.log('user cancel')
                                } else {
                                    console.log(`user selected: ${videoPath}`)
                                    parentWindow.webContents.send('fileSelected', videoPath);
                                    const menu = Menu.getApplicationMenu();
                                    menu.getMenuItemById('convertToAVI').enabled = true;
                                    menu.getMenuItemById('convertToMp4').enabled = true;
                                    menu.getMenuItemById('convertToWEBM').enabled = true                        
                                }
                                
                        });      
                       
                     }   
                    },
                    { type: 'separator' },
                    {
                        label:"Convert to AVI",
                        enabled: false,
                        id:'convertToAVI',  
                        click: (event,parentWindow) => {
                            convertVideo('avi', parentWindow);               
                        }            
                    },
                   
                    {
                        label:"Convert to MP4",
                        enabled: false,
                        id:'convertToMp4',
                        click: (event,parentWindow) => {
                            convertVideo('mp4', parentWindow);   
                        }        
                    
                    },
                    {
                        label:"Convert to WEBM",
                        enabled: false,
                        id:'convertToWEBM',
                        click: (event,parentWindow) => {
                            convertVideo('webm', parentWindow);                                
                        }                              
                    },                       
                ]
            },
            { type: 'separator' },           
            
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
  },
  {
        label:"Developer",
        submenu:[
                {role:'toggleDevTools'}
        ]
    
  }
];

//move menu over if onMAC, so we get a file Menu
if(isMac) {
    menuTemplate.unshift(
        {
            label:'placeholder'
        }
    );
}

//define a function to handle savedialog and conversion
function convertVideo(format, parentWindow) {
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

    dialog.showSaveDialog(parentWindow, options)
        .then((saveFile) => {
            if (saveFile.canceled) {
                console.log('User cancelled the save dialog');
                return;
            }

            let outputPath = saveFile.filePath;

            ffmpeg(videoPath)
                .toFormat(format)
                .on('progress', function(progress) {
                        console.log( progress);
                      })
                .on('error', err => console.error(err))
                .on('end', () => console.log(`Conversion to ${format} finished!`))
                .save(outputPath);
        });
}


module.exports = Menu.buildFromTemplate(menuTemplate);


