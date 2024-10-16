const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./app/javascript/initialize/config');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      application: '/app/javascript/App.tsx'
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
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]'
          }
        },
      ],
    },
    output: {
      filename: '[name].js',
      sourceMapFilename: '[name].js.map',
      path: path.resolve(__dirname, 'app/assets/builds'),
      publicPath: '/',
      charset: true
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      }),
      new HtmlWebpackPlugin({
        template: 'app/javascript/templates/index.html',
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
        typescript: {
          configFile: './tsconfig.json',
        },
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        files: './app/javascript/**/*',
        fix: true,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'app/assets/images'), // Source folder
            to: path.resolve(__dirname, 'app/assets/builds/images'), // Destination folder
            noErrorOnMissing: true, // Optional: Ignore if the source folder doesn't exist
            globOptions: {
              ignore: ['**/.DS_Store'], // Optional: Ignore specific files
            },
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@fontsource': path.resolve(__dirname, 'node_modules/@fontsource'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'app/assets/builds'),
      },
      proxy: [{
        context: ['/api'],
        target: config.RAILS_API_URL
      }],
      hot: true,
      open: true,
      historyApiFallback: true,
      allowedHosts: [
        'localhost',
        '.ngrok-free.app',
        '192.168.1.132'
      ],
      client: {
        webSocketURL: {
          hostname: '0.0.0.0',
          pathname: '/ws',
          port: 8080,
        },
      },
      webSocketServer: 'ws'
    },
    stats: {
      children: true
    }
  }
};