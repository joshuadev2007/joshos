// JoshOS offline shell; user data remains in browser-local storage.
const VERSION='joshos-shell-2.0.0';
const ESSENTIAL=['./','./index.html','./app.js','./style.css','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./games/penales.html','./modules/fe/index.html','./modules/fe/app.js','./modules/fe/style.css','./modules/levelup/index.html','./modules/levelup/app.js','./modules/levelup/style.css'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ESSENTIAL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))),self.clients.claim()]))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(v=>{if(v.ok){let cl=v.clone();caches.open(VERSION).then(c=>c.put(r,cl))}return v}).catch(()=>caches.match(r).then(v=>v||caches.match('./index.html'))));return}
 e.respondWith(caches.match(r).then(v=>v||fetch(r).then(res=>{if(res.ok){const cpy=res.clone();caches.open(VERSION).then(c=>c.put(r,cpy))}return res})))
});
