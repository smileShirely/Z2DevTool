import { Menu, app, BrowserWindow, globalShortcut, ipcMain} from 'electron'
const menubar = require('menubar')
const path = require('path')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// function createWindow () {
//   /**
//    * Initial window options
//    */
//   mainWindow = new BrowserWindow({
//     height: 563,
//     useContentSize: true,
//     width: 1000
//   })

//   mainWindow.loadURL(winURL)

//   mainWindow.on('closed', () => {
//     mainWindow = null
//   })
// }

// app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.on('activate', () => {
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */


const mb = menubar({
  index: path.join(winURL),
  icon: path.join(__dirname, '/../assets/IconTemplate.png'),
  width: 580,
  height: 500,
  resizable: true,
  showDockIcon: true,
  preloadWindow: true
})

mb.on('ready', function ready () {
  // autoUpdater()

    // ToDo: Not working anymore with electron 1.4
    // mb.window.openDevTools();

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    // Register a shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+Shift+W', function () {
    if (mb.window.isVisible()) {
      mb.window.hide()
    } else {
      mb.window.show()
    }
  })

  if (!ret) {
    console.log('registration failed')
  }

  mb.showWindow()

  ipcMain.on('no-title', function (event, args) {
    mb.tray.setToolTip('temps')
    mb.tray.setTitle('')
    changeIcon('01d')
  })

  ipcMain.on('set-title', function (event, args) {
    const temperature = Math.round(args.temperature) + '°'
    mb.tray.setToolTip(args.location + ' / ' + temperature)
    mb.tray.setTitle(temperature)
    changeIcon(args.icon)
  })

  ipcMain.on('icon-setting', function (event, args) {
    iconSetting = args.setting
    changeIcon(args.icon)
  })

  ipcMain.on('close', function (event, args) {
    app.quit()
  })

  ipcMain.on('will-navigate', function (event, args) {
    const url = args.url
    electron.shell.openExternal(url)
  })

  ipcMain.on('auto-launch', function (event, args) {
    // ToDo: appLauncher.isEnabled() not working for now
    // console.log(appLauncher.isEnabled());
    if (autoLaunch) {
      appLauncher.disable()
      autoLaunch = false
      console.log('disable auto-launch')
    } else {
      appLauncher.enable()
      autoLaunch = true
      console.log('enable auto-launch')
    }
  })

    // ToDo: open links in external browser
    // mb.on('will-navigate', function(e, url) {
    //     console.log('navigate');
    //     e.preventDefault();
    //     electron.shell.openExternal(url);
    // });
})

mb.on('show', function show () {
  mb.window.webContents.send('show')
})




const template = [{
  label: 'Temps',
  submenu: [
    { label: 'About Temps', selector: 'orderFrontStandardAboutPanel:' },
    { type: 'separator' },
    { label: 'Quit', accelerator: 'Command+Q', click: function () { app.quit() } }
  ]},
  {
    label: 'Edit',
    submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
        { type: 'separator' },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      }
    ]}, {
      label: 'Actions',
      submenu: [
        { label: 'Details', accelerator: 'CmdOrCtrl+D', click: function (item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.send('toggle-details') } },
        { label: 'Settings', accelerator: 'CmdOrCtrl+S', click: function (item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.send('toggle-settings') } },
        { type: 'separator' },
        { label: 'Reload Data', accelerator: 'CmdOrCtrl+E', click: function (item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.send('reload-data') } },
        { label: 'Favorite City', accelerator: 'CmdOrCtrl+F', click: function (item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.send('favorite-city') } },
        { label: 'Randomn City', accelerator: 'CmdOrCtrl+W', click: function (item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.send('random-city') } },
        { label: 'Geolocation', accelerator: 'CmdOrCtrl+G', click: function (item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.send('geolocation') } }
      ]
    }
]