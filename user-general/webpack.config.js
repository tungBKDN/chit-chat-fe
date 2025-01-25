// filepath: /project-root/messaging/webpack.config.js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const share = require("webpack/lib/sharing/share");

module.exports = {
  output: {
    uniqueName: "user-general",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...require("webpack/lib/sharing/resolve").default,
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "user-general",
      filename: "remoteEntry.js",
      exposes: {
        // TODO: Implement this for an exposed module
        './Module': './src/app/index.html',
      },
      shared: share({
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
      }),
    }),
  ],
};