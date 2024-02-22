const {ipcRenderer} = require('electron');


ipcRenderer.on('fileSelected', (event, videoPath) => {
    console.log(`Render received video path ${videoPath}`);
    ipcRenderer.send('startProgress',null )
    document.querySelector(".js-player").src = videoPath;
  });

ipcRenderer.on('progressCompleted',(event,message) => {
  document.querySelector("#messages").innerHTML = `<p>${message}</p>`
});

