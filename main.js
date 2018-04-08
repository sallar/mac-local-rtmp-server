const NodeMediaServer = require('node-media-server');
const electron = require('electron');
const Menubar = require('menubar');
const path = require('path');

const { app, BrowserWindow } = electron;

const currentStreams = new Set();
const menubar = Menubar({
  dir: path.resolve(app.getAppPath(), 'view'),
  height: 200
});

function changeMenubarState() {
  if (currentStreams.size > 0) {
    // set recording
    menubar.tray.setImage(
      path.resolve(app.getAppPath(), 'view/recordingTemplate.png')
    );
  } else {
    // set normal
    menubar.tray.setImage(
      path.resolve(app.getAppPath(), 'view/readyTemplate.png')
    );
  }
}

const nms = new NodeMediaServer({
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
});

nms.on('prePublish', id => {
  if (!currentStreams.has(id)) {
    currentStreams.add(id);
  }
  changeMenubarState();
});

nms.on('donePublish', id => {
  currentStreams.delete(id);
  changeMenubarState();
});

nms.run();

menubar.on('ready', () => {
  changeMenubarState();
});

// menubar.on('after-create-window', () => {
//   menubar.window.webContents.openDevTools();
// });
