const {ipcRenderer} = require('electron');


ipcRenderer.on('fileSelected', (event, videoPath) => {
    document.querySelector(".js-player").src = videoPath;
  });