const path = require("path");

module.exports = {
  mode: "production",
  entry: ["./lib/index.ts"],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "index.js",
    libraryTarget: "umd",
    library: "MagicTsService",
    umdNamedDefine: true,
    path: path.resolve(__dirname, "./")
  }
};
