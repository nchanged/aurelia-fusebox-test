
const fb = require("fuse-box");
const fuse = fb.FuseBox;

// main bundle/setup
let MainAppFuse = fuse.init({
    homeDir: "./src",
    outFile: "./vendor-bundle.js",
    tsConfig : "tsconfig.json",
    useCache:false,
    plugins: [
        fb.CSSPlugin(),
        fb.HTMLPlugin({ useDefault: true }),
        fb.TypeScriptHelpers()
    ],
    sourceMap: {
        bundleReference: "./vendor-bundle.js.map",
        outFile: "./vendor-bundle.js.map",
    }
})

//grid bundle
let gridFuse = fuse.init({
        package: "aurelia-v-grid",
        homeDir: "./node_modules/aurelia-v-grid/dist/commonjs",
        outFile: "./aurelia-v-grid.js",
        globals: { "aurelia-v-grid": "aurelia-v-grid" },
        plugins: [
        fb.CSSPlugin(),
        fb.HTMLPlugin({ useDefault: true }),
    ]
})
gridFuse.bundle('> index.js + **/*.html + **/*.js + **/*.css'); // I need remove dependencies here, no need to include evrything here too



// dev server
MainAppFuse.devServer(`
    > main.ts
    + **/*.html 
    + **/*.ts 
    + **/*.css 
    + aurelia-framework
    + aurelia-polyfills
    + aurelia-fetch-client
    + aurelia-pal-browser
    + aurelia-animator-css
    + aurelia-logging-console 
    + aurelia-templating-binding 
    + aurelia-templating-resources 
    + aurelia-event-aggregator 
    + aurelia-history-browser 
    + aurelia-templating-router
    `)
