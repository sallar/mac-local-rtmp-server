const { ipcRenderer, remote } = require('electron');
const template = require('lodash/template');
const fs = require('fs');
const path = require('path');
const filesize = require('filesize');
const shortid = require('shortid');

const API_URI = 'http://localhost:8000/api';
const rtmpUri = `rtmp://127.0.0.1/live/${shortid.generate()}`;

const streamsTemplate = template(
  fs.readFileSync(
    path.join(remote.app.getAppPath(), 'assets/streams.ejs'),
    'utf8'
  )
);
const streamsContainer = document.getElementById('streams');

function fetchStreamInfo() {
  fetch(`${API_URI}/streams`)
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

fetchStreamInfo();
setInterval(fetchStreamInfo, 5000);
