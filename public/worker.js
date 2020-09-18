// let CACHE_NAME = "sorting_visualizer";
// let urlsToCache = [
//   "/",
//   "index.html",
//   "../src/App.js",
//   "../src/index.js",
//   "../src/index.css",
//   "https://fonts.googleapis.com/icon?family=Material+Icons",
//   "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap",
// ];

// // Install a service worker
// self.addEventListener("install", (event) => {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       console.log("Opened cache");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Cache and return requests
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });

// // Update a service worker
// self.addEventListener("activate", (event) => {
//   let cacheWhitelist = ["sorting_visualizer"];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// const staticCacheName = "site-static";
// const dynamicCacheName = "site-dynamic";
// const assets = [
//   "/",
//   "/index.html",
//   "../src/App.js",
//   "../src/index.js",
//   "../src/index.css",
//   "../src/Components/SortingVisualizer/index.js",
//   "../src/Components/Sidebar/Sidebar.js",
//   "../src/Components/InfoSection/InfoSection.js",
//   "../src/Components/InfoSection/SelectionSortCode.js",
//   "../src/Components/InfoSection/InsertionSortCode.js",
//   "../src/Components/InfoSection/BubbleSortCode.js",
//   "../src/Components/InfoSection/CodeStyles.css",
//   "https://fonts.googleapis.com/icon?family=Material+Icons",
//   "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap",
// ];

const staticCacheName = "site-static";
const dynamicCacheName = "site-dynamic";
const assets = [
  "/",
  "/index.html",
  "../src/App.js",
  "../src/index.js",
  "../src/index.css",
  "../src/Components/SortingVisualizer/index.js",
  "../src/Components/Sidebar/Sidebar.js",
  "../src/Components/InfoSection/InfoSection.js",
  "../src/Components/InfoSection/SelectionSortCode.js",
  "../src/Components/InfoSection/InsertionSortCode.js",
  "../src/Components/InfoSection/BubbleSortCode.js",
  "../src/Components/InfoSection/CodeStyles.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap",
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener("install", (evt) => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      //console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch events
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCacheName).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            // check cached items size
            limitCacheSize(dynamicCacheName, 15);
            return fetchRes;
          });
        })
      );
    })
  );
});
