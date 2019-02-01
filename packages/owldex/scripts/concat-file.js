const fs = require("fs");
const path = require("path");
const glob = require("glob");
const { promisify } = require("util");

const args = process.argv.slice(2);
const [input, target] = args;
const root = path.join(__dirname, "../");

const options = { cwd: root, root };
const listFiles = promisify(glob.glob);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const concatFiles = async (input, target) => {
  const filesPromise = [readFile(input, "utf-8"), readFile(target, "utf-8")];

  Promise.all(filesPromise).then(([inputData, targetData]) => {
    writeFile(target, targetData + inputData);
  });
};

const init = async (input, target, options) => {
  console.log(`concat ${input} to ${target}`);
  const listFilesPromise = [
    listFiles(input, options),
    listFiles(target, options)
  ];

  const [inputFiles, targetFiles] = await Promise.all(listFilesPromise);
  inputFiles.forEach(file => {
    targetFiles.forEach(target => {
      concatFiles(file, target);
    });
  });
};

init(input, target, options);
