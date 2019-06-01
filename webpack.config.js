const path = require("path");
const webpack = require("webpack");

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
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
