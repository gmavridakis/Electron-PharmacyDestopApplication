const electron = require('electron')
const {app, BrowserWindow, Menu, ipcMain, dialog } = electron
const path = require('path')
const url = require('url')

let mainWindow,loginWindow,aboutWindow,menu
let loginTries = 3;

/* EVENT HANDLERS - START */
ipcMain.on('login-error-dialog',function(){
  loginTries --;
  if(loginTries === 0){
    loginWindow.close()
  }
  else{
    dialog.showErrorBox('Login Failure', 'Credentials were wrong. You have ' +loginTries +' tries left.');
  }
})
ipcMain.on('login-success-dialog',function(){
  //Load main window
  openMainWindow()
  loginWindow.close()
})

ipcMain.on('delete-confirm-dialog',function(event,arg){
  let modalDeleteOptions  = {
    buttons: ["Yes","No"],
    message: "Do you really want to delete entry?"
   }
  let response = dialog.showMessageBox(modalDeleteOptions)
  event.sender.send('reply-delete-confirm-dialog' ,response)
})

/* EVENT HANDLERS - END */

// start with the login window
function createWindow () {
  // Create the browser window.
  loginWindow = new BrowserWindow({
    width: 500,
    height: 400,
    icon: 'assets/icons/logo.ico'
  })
  loginWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/components/login-page/login.html'),
    protocol: 'file:',
    slashes: true
  }))
  loginWindow.setMenu(null)
  loginWindow.on('closed', () => {
    loginWindow = null
  })
}

// opens after successful login main window of application
function openMainWindow() {
  // Set up the menu
  menuTemplate = [
    {
      label: 'Application Author',
      submenu: [
        {
          label: 'About',
          click: () => {
            openAboutWindow()
          }
        }
      ]
    }
  ]
  menu = Menu.buildFromTemplate(menuTemplate)
  // init Main window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: 'assets/icons/logo.ico'
  })
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/components/homepage/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.setMenu(menu)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Opens the about window in menu
function openAboutWindow() {
  aboutWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 400,
    height: 250
  })
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/components/menu-items/about.html'),
    protocol: 'file:',
    slashes: true
  }))
  aboutWindow.setMenu(null)
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })
}


// Create the window then the app is ready
app.on('ready', () => {
  //openMainWindow()
  createWindow() // ENABLE LOGIN 1
  electron.powerMonitor.on('on-ac', () => {
    mainWindow.restore()
  })
  electron.powerMonitor.on('on-battery', () => {
    mainWindow.minimize()
  })
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Reopen the app on macOS
app.on('activate', () => {
  if (mainWindow === null) {
    //openMainWindow()
    createWindow() // ENABLE LOGIN 2
  }
})
