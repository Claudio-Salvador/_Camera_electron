const { app, BrowserWindow,ipcMain} = require('electron')

const createWindow=()=>{
    const win= new BrowserWindow({
       
        width:590,
        height:590,
        // width:390,
        // height:390,
        webPreferences:{
            nodeIntegration:true,
            devTools:true,
        },
        frame:false,
        // transparent:true,
        movable:true,
        resizable:false,
        titleBarStyle:"customButtonsOnHover",
        // alwaysOnTop:true,
    });

    win.loadFile('src/config.html');
    
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', (e) => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit() 
})