const { Menu, dialog } = require('electron');
const isMac = process.platform === 'darwin';



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
                            message:"please a valid video"
                        }

                       
                        dialog.showOpenDialog(parentWindow,dialogOptions).then((fileInfo) => {
                                const videoPath=fileInfo.filePaths[0];
                                console.log(fileInfo);
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
                        id:'convertToAVI'
                       
                    },
                   
                    {
                        label:"Convert to MP4",
                        enabled: false,
                        id:'convertToMp4'
                    
                    },
                    {
                        label:"Convert to WEBM",
                        enabled: false,
                        id:'convertToWEBM'
                      
                    
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


