import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const mode=process.argv[2];if(!['mobile','desktop'].includes(mode))throw Error('Uso: node native/prepare.mjs mobile|desktop');
const dest=path.join(root,mode,'www');fs.rmSync(dest,{recursive:true,force:true});fs.mkdirSync(dest,{recursive:true});
for(const f of ['index.html','app.js','suite-upgrade.js','style.css','suite-upgrade.css','mega-studio.css','mega-studio.js','kaiu-core.js','kaiu-experts.js','kaiu-ai.js','kaiu-ai.css','kaiu-life.js','kaiu-life.css','sw.js','manifest.webmanifest','cloud-config.js','cloud-sync.js','cloud-sync.css'])fs.copyFileSync(path.join(root,f),path.join(dest,f));
fs.cpSync(path.join(root,'assets'),path.join(dest,'assets'),{recursive:true});
fs.cpSync(path.join(root,'modules'),path.join(dest,'modules'),{recursive:true});
fs.cpSync(path.join(root,'games'),path.join(dest,'games'),{recursive:true});
if(mode==='mobile'){
 let html=fs.readFileSync(path.join(dest,'index.html'),'utf-8');html=html.replace('<script src="./app.js" defer></script>','<script src="./native-bridge.js" defer></script><script src="./app.js" defer></script>');fs.writeFileSync(path.join(dest,'index.html'),html);
}
console.log(`JoshOS ${mode}: copiados los módulos Fe/LevelUp y activos a ${dest}`);
