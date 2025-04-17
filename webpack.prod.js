const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',  // Add postcss-loader
      ],
    },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),  // Replaces contentBase
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
     new Dotenv({
        path: './.env', // or just .env if that’s what you use
      }),
  ],
};
