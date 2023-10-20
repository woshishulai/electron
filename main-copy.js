const { app, BrowserWindow } = require("electron");
const path = require("path");
const { default: WinState } = require("electron-win-state");
const createWindow = () => {
  const winState = new WinState({
    defaultWidth: 1000,
    defaultHeight: 800,
  });
  const win = new BrowserWindow({
    //自定义窗口状态
    ...winState.winOptions,
    webPreferences: {
      //运行制定的js文件 定义预加载js
      // preload: path.resolve(__dirname, "./preload/index.js"),
    },
  });
  win.loadURL("http://localhost:5173/");
  // win.loadURL( '') 填网址
  // win.loadFile('index.html') //填文件
  // win.webContents.openDevTools() //打开调试工具
  win.webContents.openDevTools(); //打开调试工具
  winState.manage(win);
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
//关闭窗口
app.on("window-all-closed", () => {
  app.quit();
});
