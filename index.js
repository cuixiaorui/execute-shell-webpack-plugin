const { exec } = require("child_process");
const defaultOptions = {
  preBuild: [],
  postBuild: [],
  preExit: [],
};

function mergeOptions(options) {
  return Object.assign({}, defaultOptions, options);
}

function executeShellCommand(shellCommands = []) {
  shellCommands.forEach((info) => {
    const { command, callback } = info;
    exec(command, (err, stdout, stderr) => {
      if (err) {
        throw err;
      }
      callback && callback(stdout, stderr);
    });
  });
}

module.exports = class ExecuteShellPlugin {
  constructor(options) {
    this.options = mergeOptions(options);
  }

  apply(compiler) {
    // 基于事件
    // 生命周期
    // 1. 准备阶段
        // 1. 创建 compilation 对象
    // 2. build 阶段
        // 1. 处理 module 和 chunk
    // 3. 文件生成阶段
        // 1. 最后处理生成文件的阶段了
    const self = this;
    compiler.hooks.compilation.tap("ExecuteShellPlugin", function (
      compilation
    ) {
    //   console.log("---------compile--------");
      executeShellCommand(self.options.preBuild);
    });

    compiler.hooks.afterEmit.tap("ExecuteShellPlugin", function (compilation) {
    //   console.log("---------afterEmit--------");
      executeShellCommand(self.options.postBuild);
    });

    compiler.hooks.done.tap("ExecuteShellPlugin", function (stats) {
    //   console.log("---------done--------");
      executeShellCommand(self.options.preExit);
    });
  }
};
