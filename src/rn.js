import { isExist } from "./utils.js";
import { rename } from "node:fs/promises";
import path from "path";

const rn = async (currentDirectory, pathToFile, newName) => {
  try {
    if (!pathToFile || !newName) {
      console.log("\nIncorrect command\n");
      return;
    }

    let absolutePath = pathToFile;
    if (!path.isAbsolute(pathToFile)) {
      absolutePath = path.join(currentDirectory, pathToFile);
    }
    absolutePath = path.normalize(absolutePath);

    if (await isExist(absolutePath)) {
      rename(absolutePath, path.join(absolutePath, `..`, newName));
      console.log("\nFile renamed successfully\n");
    } else {
      console.log("\nFile doesnt exist\n");
    }
  } catch {
    console.log("\nIncorrect command\n");
    console.log(`\nYou are currently in ${currentDirectory}\n`);
  }
};

export default rn;
