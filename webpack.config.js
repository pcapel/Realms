const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    app: './pongGame.js',
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[game].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }],
      },
    ],
  },
};
