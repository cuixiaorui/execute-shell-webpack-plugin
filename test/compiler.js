const webpack = require("webpack");
const path = require("path");
const memoryfs = require("memory-fs");
const ExecuteShellPlugin = require("../index");

module.exports = (options) => {
  return new Promise((resolve, reject) => {
    const compiler = webpack({
      mode: "development",
      entry: path.resolve(__dirname, "./fixture/index.js"),
      output: {
        filename: "main.js",
        path: path.resolve(__dirname, "./dist"),
      },
      plugins: [
        new ExecuteShellPlugin(options),
      ],
    });

    compiler.outputFileSystem = new memoryfs();

    compiler.run((err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats);
    });
  });
};
