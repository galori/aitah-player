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
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
      static: path.join(__dirname, 'app/assets/builds'),
      compress: true,
      port: 9000,
      hot: true,
      devMiddleware: {
        index: false, // specify to enable root proxying
      },
      proxy: [
        {
          context: () => true,
          target: 'http://localhost:3000',
        },
      ]
    }
  }
};