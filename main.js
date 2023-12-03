const { app, BrowserWindow } = require('electron')

const createWindow=()=>{
    const win= new BrowserWindow({
        width:290,
        height:290,
        webPreferences:{
            nodeIntegration:true
        },
        frame:false,
        transparent:true,
        movable:true,
        resizable:false,
        titleBarStyle:"customButtonsOnHover",
        alwaysOnTop:true,
    });

    win.loadFile('src/index.html');
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit() 
})