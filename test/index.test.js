const compiler = require("./compiler");

jest.mock("child_process", () => ({
  exec: jest.fn((command, callback) => callback()),
}));

const { exec } = require("child_process");

describe("execute-shell-plugin", () => {
  let options;
  beforeEach(() => {
    options = {
      preBuild: [
        {
          command: "ls",
          callback: jest.fn(),
        },
      ],
      postBuild: [
        {
          command: "echo 'hello world' >> ./dist/doc.txt",
          callback: jest.fn(),
        },
      ],
      preExit: [],
    };
    return compiler(options);
  });

  it("execute shell command", () => {
    expect(options.preBuild[0].callback).toHaveBeenCalled();
    expect(options.postBuild[0].callback).toHaveBeenCalled();

    expect(exec).toHaveBeenNthCalledWith(1, "ls", expect.anything());
    expect(exec).toHaveBeenNthCalledWith(
      2,
      "echo 'hello world' >> ./dist/doc.txt",
      expect.anything()
    );
  });
});
