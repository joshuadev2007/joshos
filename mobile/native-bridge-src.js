import{Filesystem,Directory,Encoding}from '@capacitor/filesystem';import{Share}from '@capacitor/share';
async function shareBackup(name,content){const fname=String(name).replace(/[^\w.-]/g,'_');await Filesystem.writeFile({path:fname,data:content,directory:Directory.Cache,encoding:Encoding.UTF8});const file=await Filesystem.getUri({path:fname,directory:Directory.Cache});await Share.share({title:'Respaldo personal JoshOS',url:file.uri,dialogTitle:'Guardar respaldo'});}
window.JoshOSNative={shareBackup};window.LevelUpNative={shareBackup};window.MiBitacoraNative={shareBackup};
