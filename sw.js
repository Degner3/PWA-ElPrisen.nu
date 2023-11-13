const staticCacheName = "site-static-v1.1";

const dynamicCacheName = "site-dynamic-v2";


if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(reg => console.log('sw reqistered', reg))
	.catch(err => console.error('sw not registered', err)) 
}


const assets = [
    "./offline.html",
    "./historik.html",
    "./oversigt.html",
    "./settings.html",
    "./dashboard.html",
    "./Style/css/Global.css",
    "./Style/css/Historik.css",
    "./Style/css/index.css",
    "./Style/css/Oversigt.css",
    "./Style/css/Settings.css",
    "./Style/css/dashboard.css",
    "./index.html",
    "./Style/css/offline.css",
    "./manifest.json",
];


caches.open("my-cache").then((cache) => {
    cache.addAll(assets);
});


self.addEventListener("install", (event) => {
    console.log("Service Worker has been installed");
  
    event.waitUntil(
      caches.open(staticCacheName).then((cache) => {
        console.log("Write asset files to cache");
        cache.addAll(assets).catch((error) => {
          console.log(error, "Der er en fejl");
        });
      })
    );
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker has been activated");
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(
          keys
  
            .filter((key) => key !== staticCacheName)
  
            .map((key) => caches.delete(key))
        );
      })
    );
});


self.addEventListener("fetch", (event) => {
    if (!(event.request.url.indexOf("http") === 0)) return;
  
    event.respondWith(
      caches
        .match(event.request)
        .then((cacheRes) => {
          return (
            cacheRes ||
            fetch(event.request).then(async (fetchRes) => {
              return caches.open(dynamicCacheName).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
  
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          
          return caches.match("/offline.html");
        })
    );
    // Limit
    const limitCacheTwo = (cacheName, numberOfAllowedFiles) => {
      caches.open(cacheName).then((cache) => {
        cache.keys().then((keys) => {
          if (keys.length > numberOfAllowedFiles) {
            cache
              .delete(keys[0])
              .then(limitCacheTwo(caches, numberOfAllowedFiles));
          }
        });
      });
    };
  
    limitCacheTwo(dynamicCacheName, 2);
});  