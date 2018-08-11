const { ipcRenderer, remote } = require('electron');
const template = require('lodash/template');
const fs = require('fs');
const path = require('path');
const filesize = require('filesize');
const shortid = require('shortid');

const rtmpUri = `rtmp://127.0.0.1/live/${shortid.generate()}`;

const streamsTemplate = template(
  fs.readFileSync(
    path.join(remote.app.getAppPath(), 'assets/streams.ejs'),
    'utf8'
  )
);
const streamsContainer = document.getElementById('streams');

function fetchStreamInfo(port = 8000) {
  fetch(`http://localhost:${port}/api/streams`)
    .then(res => res.json())
    .then(res => {
      streamsContainer.innerHTML = streamsTemplate(
        Object.assign({}, res, {
          rtmpUri,
          tools: {
            filesize
          }
        })
      );
    });
}

document.querySelector('.quit').addEventListener('click', () => {
  remote.app.quit();
});

ipcRenderer.on('port-ready', (e, port) => {
  fetchStreamInfo(port);
  setInterval(() => fetchStreamInfo(port), 5000);
});

ipcRenderer.send('app-ready');
