const path = require("path");
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "/../dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: "config/tsconfig.json"
          }
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new WebpackObfuscator ({
      rotateStringArray: true
    }, ['excluded_bundle_name.js'])
  ],
  mode: "production"
};