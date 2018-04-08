const NodeMediaServer = require('node-media-server');
const electron = require('electron');
const Menubar = require('menubar');
const path = require('path');

const { app, BrowserWindow } = electron;

const menubar = Menubar({
  dir: path.resolve(app.getAppPath(), 'view'),
  height: 200
});

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
nms.run();

menubar.on('ready', () => {
  menubar.showWindow();
});

menubar.on('after-create-window', () => {
  menubar.window.webContents.openDevTools();
});
