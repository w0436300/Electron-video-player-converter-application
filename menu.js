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
                                }
                                
                        });      
                       
                     }   
                    },
                    {
                        label:"show message...",
                        click(event, parentWindow) {
                            dialog.showMessageBox(parentWindow,{
                                type:'warning',
                                title:"Message from Claire",
                                message:"your cpu is overheating"
                            });
                        }
                    
                    }
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


