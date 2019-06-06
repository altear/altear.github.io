const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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

miniCssLoaderRule = () => {
    return {
        loader: MiniCssExtractPlugin.loader,
        options: {
            // only enable hot in development
            hmr: process.env.NODE_ENV === "development",
            // if hmr does not work, this is a forceful method.
            reloadAll: true
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
                use: ["css-hot-loader", miniCssLoaderRule(), cssLoaderRule()],
                exclude: /\.module\.css$/
            },

            {
                test: /\.less$/,
                use: [
                    "css-hot-loader",
                    miniCssLoaderRule(),
                    cssLoaderRule(),
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    }
};

module.exports = config;
