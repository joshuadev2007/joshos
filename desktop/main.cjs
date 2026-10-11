const {app,BrowserWindow,shell,protocol,net}=require('electron');const path=require('node:path');const{pathToFileURL}=require('node:url');
protocol.registerSchemesAsPrivileged([{scheme:'joshos',privileges:{standard:true,secure:true,supportFetchAPI:true,stream:true}}]);
const root=path.join(__dirname,'www');
app.whenReady().then(()=>{
 protocol.handle('joshos',request=>{try{const url=new URL(request.url);const relative=decodeURIComponent(url.pathname).replace(/^\/+/, '')||'index.html';const target=path.resolve(root,relative);if(target!==root&&!target.startsWith(root+path.sep))return new Response('Forbidden',{status:403});return net.fetch(pathToFileURL(target).toString())}catch{return new Response('Not found',{status:404})}});
 const win=new BrowserWindow({width:1410,height:910,minWidth:400,minHeight:660,backgroundColor:'#0b101c',title:'JoshOS · Tu universo personal',icon:path.join(__dirname,'www/assets/icon-512.png'),autoHideMenuBar:true,webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true,webSecurity:true}});
 win.loadURL('joshos://local/index.html');
 win.webContents.setWindowOpenHandler(({url})=>{if(/^https?:\/\//i.test(url))shell.openExternal(url);return{action:'deny'}});
 win.webContents.on('will-navigate',(event,url)=>{if(!url.startsWith('joshos://local/')){event.preventDefault();if(/^https?:\/\//i.test(url))shell.openExternal(url)}});
 win.webContents.session.on('will-download',(_event,item)=>{item.setSaveDialogOptions({title:'Guardar archivo JoshOS',defaultPath:path.join(app.getPath('documents'),item.getFilename())})});
 app.on('activate',()=>{if(!BrowserWindow.getAllWindows().length)app.relaunch()});
});app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
