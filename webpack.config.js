const path = require("path");
const webpack = require("webpack");
const Fiber = require("fibers"); // Allows for synchronous compilation- makes things compile much faster

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    app: "./src/main.js"
  },
  devServer: {
    // contentBase="./dist",
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              fiber: Fiber
            }
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
