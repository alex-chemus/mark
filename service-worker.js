if(!self.define){let s,i={};const l=(l,e)=>(l=new URL(l+".js",e).href,i[l]||new Promise((i=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=i,document.head.appendChild(s)}else s=l,importScripts(l),i()})).then((()=>{let s=i[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(e,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let c={};const u=s=>l(s,r),o={module:{uri:r},exports:c,require:u};i[r]=Promise.all(e.map((s=>o[s]||u(s)))).then((s=>(n(...s),c)))}}define(["./workbox-ca2b596c"],(function(s){"use strict";s.setCacheNameDetails({prefix:"mark"}),self.skipWaiting(),s.precacheAndRoute([{url:"/404.html",revision:"19ca2cac7b9e4aa9f59180f1835a9eb2"},{url:"/css/328.4ba5e386.css",revision:null},{url:"/css/336.f5e125b3.css",revision:null},{url:"/css/383.19fe6fe3.css",revision:null},{url:"/css/4.e2d0b2c6.css",revision:null},{url:"/css/40.e93da2bb.css",revision:null},{url:"/css/53.84c7a1e5.css",revision:null},{url:"/css/55.4f96ead7.css",revision:null},{url:"/css/60.272a6f30.css",revision:null},{url:"/css/707.8c922df1.css",revision:null},{url:"/css/756.568295a6.css",revision:null},{url:"/css/804.75e7984f.css",revision:null},{url:"/css/955.b6d9a7ec.css",revision:null},{url:"/css/963.d44e91ee.css",revision:null},{url:"/css/app.571d30b4.css",revision:null},{url:"/favicon.svg",revision:"06ddf0289c73c323876837bcf2167b4a"},{url:"/icons/icon-144x144.png",revision:"a5e9929bd7c386ca2a31f12226c173a9"},{url:"/icons/icon-192x192.png",revision:"1eb31242523e2413c4af8d3eefb9c56c"},{url:"/icons/icon-256x256.png",revision:"5794182289ee13aacc7f52c74c89919e"},{url:"/icons/icon-384x384.png",revision:"5b1143e0c17c6c35bc007f8f4170fe4f"},{url:"/icons/icon-512x512.png",revision:"a79ca186cecfc081a6133f3b00d2ab41"},{url:"/icons/icon-96x96.png",revision:"f0b8e3cfc03b84eaff96b17a8134e972"},{url:"/img/archive.1df2fcc0.svg",revision:null},{url:"/img/audio.1fc0d63f.svg",revision:null},{url:"/img/doc.13873dc6.svg",revision:null},{url:"/img/excel.a0e41c87.svg",revision:null},{url:"/img/folder2.53c48cfb.svg",revision:null},{url:"/img/image.f9af3c2c.svg",revision:null},{url:"/img/other.5fd78c2f.svg",revision:null},{url:"/img/pdf.37d19571.svg",revision:null},{url:"/img/presentation.94c47deb.svg",revision:null},{url:"/img/tabler-sprite.cc91f0a0.svg",revision:null},{url:"/img/video.28e34ee8.svg",revision:null},{url:"/index.html",revision:"ecf2a551b30afbad5e9c5fd1aa699c74"},{url:"/js/261.4b857241.js",revision:null},{url:"/js/328.8d78aad7.js",revision:null},{url:"/js/336.33235a8d.js",revision:null},{url:"/js/383.62fe9ff3.js",revision:null},{url:"/js/4.f1d8b1e2.js",revision:null},{url:"/js/40.8bbf0bed.js",revision:null},{url:"/js/459.f9893f26.js",revision:null},{url:"/js/53.370b6acc.js",revision:null},{url:"/js/55.f1677138.js",revision:null},{url:"/js/60.d3439449.js",revision:null},{url:"/js/707.dca38ed3.js",revision:null},{url:"/js/756.613de335.js",revision:null},{url:"/js/804.da815f0f.js",revision:null},{url:"/js/955.c1f0aa7f.js",revision:null},{url:"/js/963.6a1eecfa.js",revision:null},{url:"/js/app.a0aea639.js",revision:null},{url:"/js/chunk-vendors.65fab682.js",revision:null},{url:"/manifest.json",revision:"01e052fa4d404886acb2b69a1be49548"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{}),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("/index.html")))}));
//# sourceMappingURL=service-worker.js.map
