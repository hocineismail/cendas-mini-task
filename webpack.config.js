const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  target: "web",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@component": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@type": path.resolve(__dirname, "src/types"),
      "@db": path.resolve(__dirname, "src/database"),
      "@store": path.resolve(__dirname, "src/redux"),
    },
    fallback: { querystring: require.resolve("querystring-es3") },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new ErrorOverlayPlugin(),
    // ,
    new CopyPlugin({
      patterns: [
        { from: "*.png", context: "public" },
        { from: "*.json", context: "public" },
        { from: "*.ico", context: "public" },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Adjust the path if needed
      filename: "index.html",
    }),
    // new InjectManifest({
    //   swSrc: "./src/workbox.ts",
    //   swDest: "service-worker.js",
    //   maximumFileSizeToCacheInBytes: 5000000,
    //   exclude: [/\.LICENSE\./, /\.map$/],
    // }),
  ],
  devtool: "cheap-module-source-map",
  devServer: {
    static: path.resolve(__dirname, "build"),
    port: 3000,
    //historyApiFallback is important for router react :)
    historyApiFallback: true,
  },
};
