import { BrowserWindow, Menu } from "electron";
//自定义菜单
const template = [
    {
        label: '文件',
        submenu: [
            {
                label: '子菜单',
                //点击新建一个窗口
                click() {
                    new BrowserWindow({
                        width: 500,
                        height: 500
                    })
                }
            }
        ]
    },
    {
        label: '关于我们'
    }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)