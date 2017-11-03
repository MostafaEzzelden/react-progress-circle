var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: '#inline-source-map',
  entry: {
    'docs.js': [
      './docs/index.jsx',
      // 'webpack/hot/only-dev-server',
      // 'webpack-dev-server/client?http://localhost:8000'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name]'
  },


  module: {
    loaders: [
      {test: /\.jsx$/, loaders: ['babel']},
      {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
      { test: /\.md$/, loader: 'html!markdown' },

      // {test: /\.less$/, loaders: ["style-loader", "css-loader", "less-loader"]}
       { test: /\.less$/, loader: "style!css!less" },
       {test: /\.scss$/, loader: 'css?modules&localIdentName=[local]!postcss!sass'},
       {test: /\.css$/, loader: "style-loader!css-loader" }
    ],

    stats: {
      // Nice colored output
      colors: true
    },


  },



  postcss: [ autoprefixer({ browsers: ['last 2 version'] }) ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/vertx/)
  ]
};
