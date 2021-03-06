let path = require('path')
let url = require('url')

let { app, BrowserWindow } = require('electron');

let mainWindow

function createWindow() {
  // Creates the browser window
  mainWindow = new BrowserWindow({
    width: 400,
    height: 700,
    frame: false,
    icon: __dirname + '/app/assets/icon.png' /*, resizable: false*/
  })
  mainWindow.show()

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
app.on('ready', createWindow) //Creates a browser window after initialization

// Extra Behaviors
// Quit when all windows are closed (if not on mac)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// If there are no windows open, when application icon is clicked, make a new window
app.on('active', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
