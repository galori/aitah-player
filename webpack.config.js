const path    = require("path")
const webpack = require("webpack")
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    App: "./app/javascript/App.tsx",
    posts: "./app/javascript/posts.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    chunkFormat: "module",
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js'],
      exclude: 'node_modules',
      fix: true,
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
}
