var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: '#inline-source-map',
  entry: {
    'docs.js': [
      './docs/index.jsx',
      'webpack/hot/only-dev-server',
      // 'webpack-dev-server/client?http://localhost:8000'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name]'
  },


  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel']
      },
      {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.scss$/,
        loader: 'css?modules&localIdentName=[local]!postcss!sass'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ],
    stats: {
      colors: true
    }
  },
  postcss: [ autoprefixer({ browsers: ['last 2 version'] }) ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/vertx/)
  ]
};
