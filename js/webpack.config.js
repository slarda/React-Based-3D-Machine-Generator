const path = require('path');

module.exports = {
    mode: "development", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: {
        "3Dview":"./src/3Dview.js",
        "menu":"./src/menu.js",
        "popup":"./src/popup.js",
        "Helper":"./src/Helper.js",
    },
    output: {
        path: path.resolve(__dirname+"/dist/"),
        filename: "[name].js",
        publicPath: "assets/", // string    // the url to the output directory resolved relative to the HTML page
        library: "3DView",
        libraryTarget: "umd", // universal module definition    // the type of the exported library
        /* Advanced output configuration (click to show) */
    },
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    path.resolve(__dirname, "app/demo-files")
                ],
                // conditions for the issuer (the origin of the import)
                enforce: "pre",
                enforce: "post",
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "babel-loader",
                // the loader which should be applied, it'll be resolved relative to the context
                // -loader suffix is no longer optional in webpack2 for clarity reasons
                // see webpack 1 upgrade guide
                options: {
                    presets: ["es2015"]
                },
                // options for the loader
            },

        ]
    }
}