const NodeMediaServer = require('node-media-server');
const electron = require('electron');
const Menubar = require('menubar');
const path = require('path');

const { app, BrowserWindow, Tray } = electron;

const currentStreams = new Set();
const ASSET_PATH = path.join(app.getAppPath(), 'assets');
const menubar = Menubar({
  dir: ASSET_PATH,
  icon: path.resolve(ASSET_PATH, 'readyTemplate.png'),
  height: 200,
  transparent: true
});

function changeMenubarState() {
  if (currentStreams.size > 0) {
    // set recording
    menubar.tray.setImage(path.resolve(ASSET_PATH, 'recording.png'));
  } else {
    // set normal
    menubar.tray.setImage(path.resolve(ASSET_PATH, 'readyTemplate.png'));
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
