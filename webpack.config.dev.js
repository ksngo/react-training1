const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");


//only differences with prod
// mode: development, 
// output filename is [name].js , this create main.js and runtime.js during development
// devServer: { static: './dist'}
// optimization runtimeChunk: single (not needed because only single entry)
module.exports = {
  mode: 'development',
  devServer: {
    static: './dist'
  },
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(?:js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              ['@babel/preset-react']
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    runtimeChunk: 'single'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, 
      title: 'devTitle',
      template: './index.html'}),
    new MiniCssExtractPlugin()
  ]
};
//babel plugin runs before presets
//babel plugin runs in order of array
//babel presets runs in reverse order of array
//'@babel/preset-env', { targets: "defaults" } ==>  "> 0.5%, last 2 versions, Firefox ESR, not dead" from Browserslist
// @babel/preset-react , for jsx

//can compare to this webpack config for other loaders
//https://github.com/vedees/webpack-template/blob/webpack5/webpack/webpack.common.js

//MiniCssExtractPlugin() --> extract the CSS from your bundle
//HtmlWebpackPlugin() --> creation of html to serve webpack bundles

//css-loader interprets @import and url() like import/require() and will resolve them.
//MiniCssExtractPlugin.loader creates separate css files (for development, use style-loader as it will inject css through <style></style> which is faster)