const ExecuteShellPlugin = require("../index");

const path = require("path");
module.exports = {
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new ExecuteShellPlugin({
      preBuild: [{
          command:"ls",
          callback(stdout,stderr){
              console.log(stdout)
              console.log("pre-build")
          }
      }],
      postBuild: [{
          command:"echo 'hello world' >> ./dist/doc.txt",
          callback(stdout,stderr){
              console.log(stdout)
              console.log("post-build")
          }
      }],
      preExit: [],
    }),
  ],
};
