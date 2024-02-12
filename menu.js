const { Menu } = require('electron');
const isMac = process.platform === 'darwin'

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
                    {label:"Load"}
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