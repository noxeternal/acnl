var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './public/main.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/',
    filename: 'build.js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      'public': path.resolve(__dirname, '.')
      // 'static': path.resolve(__dirname, './static')
      // 'ws': path.resolve(__dirname, './src/ws.js')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //     loaders: {
      //       // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
      //       // the "scss" and "sass" values for the lang attribute to the right configs here.
      //       // other preprocessors should work out of the box, no loader config like this necessary.
      //       'scss': 'vue-style-loader!css-loader!sass-loader',
      //       'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
      //     }
      //     // other vue-loader options go here
      //   }
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          objectAssign: 'Object.assign'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: path.resolve('static'),
    proxy: {
      '/api': {
        target: 'http://192.168.0.116:2000',
        secure: false
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
