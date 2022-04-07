'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "da8474849eb1f52ee83a501b8a474380",
"assets/assets/flags/chinese.png": "698a902c7253b9559845371d8cf2dbd6",
"assets/assets/flags/english.png": "a7fc19d7719f03b403aef0dd038d505b",
"assets/assets/flags/french.png": "7213a16165e9ba30d33be8c953faae28",
"assets/assets/flags/hawaii.png": "ca6112acbe157a15334be0c22668d583",
"assets/assets/flags/italian.png": "081e047ecfe9640dc290937d23818718",
"assets/assets/flags/japanese.png": "b27810e1b7e13c7b6dde245209caf386",
"assets/assets/flags/korean.png": "99de9fc80bd576c39b796cd5ca73a911",
"assets/assets/flags/russian.png": "25e9c1f6c5d9afdd260c5e0aece1dd3f",
"assets/assets/images/flag.png": "b9b6933f8414a9e288541fcd4d040d43",
"assets/assets/images/hakkinda.png": "edf42c58619305378eb48f103352fd0d",
"assets/assets/images/image.png": "9f4feb67c346a027262e200fd4f188b9",
"assets/assets/images/map.png": "bb08fa72eb30307175c5eb94db04e717",
"assets/assets/images/map2.png": "06da7ae6d433a7eac76e5a0a85deafe7",
"assets/assets/images/map3.png": "31fd1b7dffb95e0ab5b08bdf75929c70",
"assets/assets/images/space.png": "e1a64d9660ed3fb472d862ea15b97667",
"assets/assets/images/space2.png": "6a1311794f1628d686024180fbfbb66a",
"assets/assets/images/world.png": "c0540d8d2219f763efeffe5a0dc50e26",
"assets/assets/images/world2.png": "2fa889826e5e88e40e257d739c5679b6",
"assets/assets/images/world3.png": "69f5993ddfb94602452d3c8dac013317",
"assets/assets/images/world4.png": "54071fa1804e668db926b1e34c2322be",
"assets/assets/images/world5.png": "04de2a53017c21e1e93ea8ed29890fa4",
"assets/assets/images/world6.png": "de0135da324667c95449c3bc2f453969",
"assets/assets/images/world7.png": "38bb565b5424faaf039c3bd78d867ebb",
"assets/assets/merhabalar/chinese.mp3": "c1cb447d7dc64fbbb3ccd926e2983489",
"assets/assets/merhabalar/english.mp3": "eb88cf4a52a193a1ed06fbbef4147008",
"assets/assets/merhabalar/english.wav": "32d9c49de919f89bfdc340454753f67b",
"assets/assets/merhabalar/french.mp3": "801ec5074722b49cda0faf26c3f20f34",
"assets/assets/merhabalar/hawaii.mp3": "f24701d964c22ea38f05aa24ed55d5df",
"assets/assets/merhabalar/italian.mp3": "5384e91f95e284e96ec3e45253e96e3f",
"assets/assets/merhabalar/japanese.mp3": "975ffab13863ee7d17d651d7b85bf95a",
"assets/assets/merhabalar/korean.mp3": "7954f9a2cd9ad000c3281c817ee87f20",
"assets/assets/merhabalar/russian.mp3": "5da27a0dbdf4b4b6f9960b86803d7ee1",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "d7a8f7a64d032a90acd96cae2e2d5323",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "565cb2c317ae15acad6e5f9ef274d94e",
"/": "565cb2c317ae15acad6e5f9ef274d94e",
"main.dart.js": "dc4816d5e9313aba20f58d9f07bc91d4",
"manifest.json": "4956455300c7e2745edcd585c20a7ada",
"version.json": "466316f9e67fab09a234eca2f42a83bc"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
