
//此页面就是主进程 渲染进程就是页面 查看主进程 log（）查看渲染进程win里按住cart+shift+i mac里是mainWindow.openDevTools()
const {app,BrowserWindow,globalShortcut, ipcMain} = require('electron')
//热加载
const reloader =require('electron-reloader')
reloader(module)

//监听初始化完成的生命周期
app.on('read',()=>{
    //窗口大小
   const mainwindow= new BrowserWindow({
        width:500,
        height:500,
        //清除顶部默认菜单
        frame:false,
        //开启node模块
        webPreferences:{
            //开启渲染进程使用node
            nodeIntegration:true,
            //开启渲染进程remote模块
            enableBlinkFeatures:true
        }
    })
    //指定展示的文件或网址
    // mainwindow.loadFile('./src/index.html')
    mainwindow.loadURL("http://localhost:5173/");
    // mainwindow.loadURL( '') 填网址
    // mainwindow.loadFile('index.html') //填文件
    mainwindow.webContents.openDevTools() //打开调试工具
    //引入自定义菜单
    require('./menu')
    //可以自己写个自定义菜单的样式   在html文件的自定义头部class增加样式 --webkit-app-region:drag 
    //点击创建窗口 看html文件的
    
    // 主进程注册快捷键
    globalShortcut.register('CommandOrControl+X',()=>{
        console.log('按下了快捷键')
    })
    globalShortcut.register('CommandOrControl+B',()=>{
        mainwindow.unmaximize();
        console.log('最小化窗口')
    })
    globalShortcut.register('CommandOrControl+S',()=>{
        mainwindow.maximize();
        console.log('最大化窗口')
    })
    globalShortcut.register('CommandOrControl+C',()=>{
        mainwindow.close()
        console.log('关闭了窗口')
    })
    //定义自定义事件 渲染进程触发  arg是接受的参数
    ipcMain.on('max-window',(event,arg)=>{
        console.log(arg);
        mainwindow.maximize();
    })
})

//打包
//  npm i electron-packager -D
