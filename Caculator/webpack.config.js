module.exports = {
    entry: "./src/index.js",
    output: {
        path: 'dist/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
            { test: /\.less$/, loader: "style!css!less" }
        ]
    }
};
