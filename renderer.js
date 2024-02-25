const {ipcRenderer} = require('electron');


ipcRenderer.on('fileSelected', (event, videoPath) => {
    console.log(`Render received video path ${videoPath}`);
    document.querySelector(".js-player").src = videoPath; 
  });
  
ipcRenderer.on('convertVideo', (event, { videoPath, format }) => {
    ipcRenderer.send('convertVideo', videoPath, format);
});

