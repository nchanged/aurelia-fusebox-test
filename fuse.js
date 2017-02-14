
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
//I need to ask if there is a better way to do this, I need to include it in devserver bundle to else I will be missing entry point
let gridFuse = fuse.init({
        package: "aurelia-v-grid",
        homeDir: "./node_modules/aurelia-v-grid/src/",
        outFile: "./aurelia-v-grid.js",
        plugins: [
        fb.CSSPlugin(),
        fb.HTMLPlugin({ useDefault: true }),
        fb.TypeScriptHelpers()
    ]
})



gridFuse.bundle(`> index.ts
    + **/*.html 
    + **/*.ts
    + **/*.css
    - aurelia-framework
    - aurelia-dependency-injectio
    - aurelia-metadata
    - aurelia-pal
    - aurelia-binding
    - aurelia-logging
    - aurelia-task-queue
    - aurelia-templating
    - aurelia-path
    - aurelia-loader`);

// I wish I could define the package above directly in 1 bundle, or multible packages in 1 file
// is there a way I can stop bundle above from bringing in other node_modules, without listing everyone?

// dev server
MainAppFuse.devServer(`
    > main.ts
    + **/*.html 
    + **/*.ts 
    + **/*.css 
    + aurelia-v-grid
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

