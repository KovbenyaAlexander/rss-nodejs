import path from "path";
import { isDirectory } from "./utils.js";

const cd = async (currentDirectory, nextDir) => {
  try {
    if (!nextDir) {
      console.log("\n Incorrect path \n");
      console.log(`\nYou are currently in ${currentDirectory}\n`);
      return currentDirectory;
    }

    let absolutePath = nextDir;
    if (!path.isAbsolute(nextDir)) {
      absolutePath = path.join(currentDirectory, nextDir);
    }

    absolutePath = path.normalize(absolutePath);
    if (await isDirectory(absolutePath)) {
      console.log(`\nYou are currently in ${absolutePath}\n`);
      return absolutePath;
    } else {
      console.log("\nIncorrect path");
      console.log(`\nYou are currently in ${currentDirectory}\n`);
      return currentDirectory;
    }
  } catch (e) {
    console.log("\nIncorrect command\n");
    console.log(`\nYou are currently in ${currentDirectory}\n`);
    return currentDirectory;
  }
};

export default cd;
