const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const styleRule = (
  { test, buildMode, sourceMap, include, exclude },
  use = []
) => ({
  include,
  exclude,
  test,
  use: [
    { loader: "css-hot-loader", options: { cssModule: true } },
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        sourceMap: sourceMap,
        importLoaders: use ? 2 : 1,
        modules: "global", // Interim: this requires us to explicitly opt-in to Modules by using `:local` selectors
        localIdentName: "[name]__[local]__[hash:base64:5]" // how class names are rendered for local
      }
    },
    {
      loader: "postcss-loader",
      options: {
        plugins:
          buildMode === "production" ? [autoprefixer, CSSNano] : [autoprefixer]
      }
    }
  ].concat(use)
});

module.exports = function config(webpackEnv = {}, opts = {}) {
  const env = opts.mode || "development";

  const isEnvDevelopment = env === "development";
  const isEnvProduction = env === "production";

  let buildMode = opts.mode || "development"; // Tells webpack which built-in optimizations to use
  let processMode = buildMode; // Switches config based on environment, should match buildMode unless running devprod

  return {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
      app: "./src/main.js"
    },
    devServer: {
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
        styleRule({
          test: /\.css$/,
          buildMode,
          sourceMap: processMode === "development"
        }),
        styleRule(
          {
            test: /\.scss$/,
            buildMode,
            sourceMap: processMode === "development"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap:
                processMode === "development" && opts.devtool !== "eval"
            }
          }
        )
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: isEnvProduction
          ? "css/[name].[contenthash].css"
          : "css/[name].css"
      })
    ],
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist")
    }
  };
};
