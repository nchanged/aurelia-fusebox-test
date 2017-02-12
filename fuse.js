
const fb = require("fuse-box");
const FuseBox = fb.FuseBox;

let fuse = FuseBox.init({
    homeDir: "src/",
    outFile: "vendor-bundle.js",
    plugins: [
        fb.HTMLPlugin({ useDefault: true }),
    ]
})



fuse.devServer(`
    > main.ts
    + **/*.html 
    + **/*.ts 
    + aurelia-framework
    + aurelia-polyfills
    + aurelia-pal-browser
    + aurelia-logging-console 
    + aurelia-templating-binding 
    + aurelia-templating-resources 
    + aurelia-event-aggregator 
    + aurelia-history-browser 
    + aurelia-templating-router
    `)
