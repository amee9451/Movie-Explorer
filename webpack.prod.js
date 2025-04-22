const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("dotenv").config();

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  target: ["web", "es2017"],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader", // Add postcss-loader
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: {
      index: "./public/index.html",
    },
    static: {
      directory: path.join(__dirname, "public"), // or wherever your index.html lives
    },
    port: 3300,
    open: true,
    hot: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
      minSize: 20000, // Increase chunking for large modules
      maxSize: 100000, // Force larger modules to split
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: "single",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
      },
    }),
    new webpack.DefinePlugin({
      "process.env.OMDB_API_KEY": JSON.stringify(process.env.OMDB_API_KEY),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CompressionPlugin({
      algorithm: "gzip", // Or 'brotliCompress'
      test: /\.(js|css|html|svg)$/,
      threshold: 10240, // Compress files larger than 10 KB
      minRatio: 0.8,
    }),
  ],
};
