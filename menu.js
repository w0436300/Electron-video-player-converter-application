const { Menu, dialog } = require('electron');
const isMac = process.platform === 'darwin';

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
                        click: (event,mainWindow) => {
                            mainWindow.webContents.send('convertVideo', { videoPath: videoPath, format: 'avi' });              
                        }            
                    },
                   
                    {
                        label:"Convert to MP4",
                        enabled: false,
                        id:'convertToMp4',
                        click: (event,mainWindow) => {
                            mainWindow.webContents.send('convertVideo', { videoPath: videoPath, format: 'mp4' });
   
                        }        
                    
                    },
                    {
                        label:"Convert to WEBM",
                        enabled: false,
                        id:'convertToWEBM',
                        click: (event,mainWindow) => {
                            mainWindow.webContents.send('convertVideo', { videoPath: videoPath, format: 'webm' });                                
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


module.exports = Menu.buildFromTemplate(menuTemplate);


