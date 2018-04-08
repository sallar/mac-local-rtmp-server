const { ipcRenderer } = require('electron');
const template = require('lodash/template');
const fs = require('fs');
const filesize = require('filesize');

const API_URI = 'http://localhost:8000/api';

const streamsTemplate = template(
  fs.readFileSync('./assets/streams.ejs', 'utf8')
);
const streamsContainer = document.getElementById('streams');

function fetchStreamInfo() {
  fetch(`${API_URI}/streams`)
    .then(res => res.json())
    .then(res => {
      streamsContainer.innerHTML = streamsTemplate(
        Object.assign({}, res, {
          tools: {
            filesize
          }
        })
      );
    });
}

fetchStreamInfo();
setInterval(fetchStreamInfo, 5000);
