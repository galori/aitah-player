const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      application: './app/javascript/index.tsx'
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? 'production' : 'development'
            }
          }
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets',
              },
            },
          ],
        },
      ],
    },
    output: {
      filename: '[name].js',
      sourceMapFilename: '[name].js.map',
      path: path.resolve(__dirname, 'app/assets/builds'),
      publicPath: '/assets/',
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        // Example: Logging each request to the console
        devServer.app.use((req, res, next) => {
          console.log(`[Request] ${req.method} ${req.url}`);
          next();
        });

        return middlewares;
      },
      liveReload: false,
      static: {
        directory: path.join(__dirname, 'app/assets/builds'),
        publicPath: '/assets/',
      },
      compress: true,
      port: 9000,
      hot: true,
      devMiddleware: {
        index: false, // specify to enable root proxying
        writeToDisk: true, // Write files to disk in dev mode, so Rails can serve static assets
      },
      proxy: [
        {
          context: () => true,
          target: 'http://localhost:3000',
          changeOrigin: true,
          bypass: function(req, res, proxyOptions) {
            if (req.headers.accept.indexOf('application/json') !== -1) {
              return null; // Let the proxy handle API requests
            }
            if (req.url.indexOf('/assets/') === 0) {
              return req.url; // Serve webpack assets directly
            }
            // For all other requests, let Rails handle it
            return null;
          }
        },
      ]
    }
  }
};