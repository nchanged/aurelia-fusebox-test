
const fb = require("fuse-box");
const FuseBox = fb.FuseBox;



let fuse = FuseBox.init({
    homeDir: "src/",
    outFile: "./vendor-bundle.js"
});




fuse.devServer(">main.ts")

