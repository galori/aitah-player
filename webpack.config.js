const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./app/javascript/initialize/config');

module.exports = (env, argv) => {
  let APP_ENV;
  if (env.development) {
    APP_ENV = 'development';
  } else if (env.test) {
    APP_ENV = 'test';
  } else if (env.production) {
    APP_ENV = 'development';
  } else {
    throw new Error(`Invalid env: ${JSON.stringify(env)}`);
  }

  console.log('************************************');
  console.log(`APP_ENV: ${APP_ENV}`);
  console.log(`Webpack mode: ${argv.mode}`);
  console.log('************************************');

  const Env = {
    isDevelopment: APP_ENV === 'development',
    isTest: APP_ENV === 'test',
    isProduction: APP_ENV === 'production'
  };

  return {
    entry: {
      application: '/app/javascript/App.tsx'
    },
    mode: argv.mode,
    devtool: Env.isProduction  ? 'source-map' : 'eval-source-map',
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
              envName: process.env.APP_ENV
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
        'process.env.APP_ENV': JSON.stringify(APP_ENV),
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

        ...(APP_ENV === 'test' && {
          'Speech$': path.resolve(__dirname, 'src/__mocks__/SpeechMock.ts'),
        }),
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