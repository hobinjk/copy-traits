const path = require('path');

module.exports = {
  entry: './copy-traits.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'copy-traits.js',
  },
  plugins: [],
  module: {
    rules: [{
      test: /\.svg$/,
      use: {loader: 'svg-inline-loader'},
    }],
  },
  mode: 'production',
};

