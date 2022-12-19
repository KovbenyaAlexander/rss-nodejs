import { isExist, isDirectory } from "./utils.js";
import { unlink } from "node:fs/promises";
import path from "path";

const rm = async (currentDirectory, pathToFile) => {
  try {
    if (!pathToFile) {
      return console.log("\nIncorrect command\n");
    }

    let absolutePath = pathToFile;
    if (!path.isAbsolute(pathToFile)) {
      absolutePath = path.join(currentDirectory, pathToFile);
    }
    absolutePath = path.normalize(absolutePath);

    if ((await isExist(absolutePath)) && !(await isDirectory(absolutePath))) {
      unlink(absolutePath);
      console.log("\nFile deleted successfully\n");
    } else {
      console.log("\nFile doesnt exists\n");
    }
    console.log(`\nYou are currently in ${currentDirectory}\n`);
  } catch {
    console.log("\nIncorrect command\n");
    console.log(`\nYou are currently in ${currentDirectory}\n`);
  }
};

export default rm;
