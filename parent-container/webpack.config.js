// Import necessary modules
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const share = require("webpack/lib/sharing/share");
require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  // Output configuration
  output: {
    uniqueName: "parentContainer", // Unique name for the container
    publicPath: "auto", // Automatically determine the public path
  },
  // Optimization settings
  optimization: {
    runtimeChunk: false, // Disable runtime chunk for better performance
  },
  // Resolve settings
  resolve: {
    alias: {
      ...require("webpack/lib/sharing/resolve").default, // Resolve shared modules
    },
  },
  // Plugins configuration
  plugins: [
    new ModuleFederationPlugin({
      name: "parentContainer", // Name of the container
      filename: "remoteEntry.js", // Filename for the remote entry
      remotes: {
        // Define remote micro-frontends with placeholders for URLs
      //   messaging: `messaging@${process.env.MESSAGING_URL}/remoteEntry.js`,
      //   dashboard: `dashboard@${process.env.DASHBOARD_URL}/remoteEntry.js`,
      },
      exposes: {
        // Expose modules if needed (currently empty)
      },
      shared: share({
        // Share common dependencies
        "@angular/core": {
          singleton: true, // Ensure a single instance of the module
          strictVersion: true, // Use strict versioning
          requiredVersion: "auto", // Automatically determine the required version
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