const {app, BrowserWindow,ipcMain} = require('electron')
const url = require('url')
const path = require('path')
const {create,read,readbyid,delet,update}=require('./Crud')
let win
function createWindow() {
   win = new BrowserWindow({width: 1200, height: 800,
      webPreferences:{
         nodeIntegration:true,
         contextIsolation:false
      }
   })
   win.setIcon(path.join(__dirname,"./lockers.png"))
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'mainwindow.html'),
      protocol: 'file:',
      slashes: true
   }))
   //win.webContents.send('all-data',read())
}
ipcMain.on('createdata',(e,data)=>{
   const res=create(data)
   console.log(res)
   e.sender.send('create-reply',res)
   //win.reload()
})
ipcMain.on('readbyid',(e,data)=>{
   console.log("Working")
   if(data==""){
      return read().then(data=>{
         console.log(data)
         e.sender.send('read-reply',data)
      })
   }
   readbyid(data).then(data=>{
      e.sender.send('read-reply',data)
   })

})
ipcMain.on('update-content',(e,data)=>{
   console.log(data)
   update(data).then(data=>{
      console.log('updated')
      e.sender.send('update-reply',data)
   }).catch(err=>{
      console.log("error:"+err.message)
   })
})
ipcMain.on('to-delete',(e,data)=>{
   console.log("Deleting")
   delet(data).then(data=>{
      e.sender.send('delete-reply',data)
   }).catch(err=>{
      console.error(err)
   })
   
})
app.on('ready', createWindow)