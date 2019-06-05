const webpack = require("webpack");
const path = require("path");

cssLoaderRule = () => {
    return {
        loader: "css-loader",
        options: {
            camelCase: "dashes",
            modules: true,
            localIdentName: "[name]__[local]___[hash:base64:5]"
        }
    };
};

const config = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", cssLoaderRule()],
                exclude: /\.module\.css$/
            },
            {
                test: /\.less$/,
                use: ["style-loader", cssLoaderRule(), "less-loader"]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    }
};

module.exports = config;
