const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const config = require('config');

// const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url');
const publicPath = ''


module.exports = {
  entry: {
    vendor: './client/vendor.js',
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
      'babel-polyfill',
      './client/main.js'
    ]
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'static'),
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    function() {
      this.plugin("done", function(stats) {
        const buildStats = stats.toJson();
        const { assetsByChunkName = {} } = buildStats;
        const chunkNames = {};

        for (const name in assetsByChunkName) {
          const fileName = []
            .concat(assetsByChunkName[ name ])
            .find(f => /^js\/.*\.js$/g.test(f));

          chunkNames[ name ] = fileName;
        }

        fs.writeFileSync(
          path.join(__dirname, "./.hash.json"),
          JSON.stringify(chunkNames)
        );
      });
    }
  ],
  resolve: {
    alias: {
      '@client': config.path.client,
      '@components': path.join(config.path.client, 'components'),
      '@page': path.join(config.path.client, 'page'),
      '@store': path.join(config.path.client, 'store'),
      '@router': path.join(config.path.client, 'router'),
      '@lib': path.join(config.path.client, 'lib'),
      '@style': path.join(config.path.client, 'style'),
      'vue$': 'vue/dist/vue.common.js'
    },
    extensions: ['.js','.vue']
  },
  devtool: '#eval-source-map'
};
