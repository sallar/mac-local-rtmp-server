const { ipcRenderer } = require('electron');
const template = require('lodash/template');
const fs = require('fs');
const filesize = require('filesize');
const shortid = require('shortid');

const API_URI = 'http://localhost:8000/api';
const rtmpUri = `rtmp://127.0.0.1/live/${shortid.generate()}`;

const streamsTemplate = template(
  fs.readFileSync('./assets/streams.ejs', 'utf8')
);
const streamsContainer = document.getElementById('streams');

function fetchStreamInfo() {
  // fetch(`${API_URI}/streams`)
  //   .then(res => res.json())
  //   .then(res => {
  //     streamsContainer.innerHTML = streamsTemplate(
  //       Object.assign({}, res, {
  //         rtmpUri,
  //         tools: {
  //           filesize
  //         }
  //       })
  //     );
  //   });
  const res = {
    live: {
      sallar: {
        publisher: {
          app: 'live',
          stream: 'sallar',
          clientId: '94SL1RVD',
          connectCreated: '2018-04-09T17:25:29.064Z',
          bytes: 4807026,
          ip: '127.0.0.1',
          audio: {
            codec: 'AAC',
            profile: 'LC',
            samplerate: 44100,
            channels: 2
          },
          video: {
            codec: 'H264',
            width: 1920,
            height: 1080,
            profile: 'High',
            level: 4.2,
            fps: 60
          }
        },
        subscribers: []
      }
    }
  };
  streamsContainer.innerHTML = streamsTemplate(
    Object.assign({}, res, {
      rtmpUri,
      tools: {
        filesize
      }
    })
  );
}

fetchStreamInfo();
setInterval(fetchStreamInfo, 5000);
