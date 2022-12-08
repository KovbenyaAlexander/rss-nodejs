import path from "path";
import { isDirectory } from "./utils.js";

const cd = async (currentDirectory, nextDir) => {
  try {
    if (!nextDir) {
      console.log("\n Incorrect path \n");
      console.log(`You are currently in ${currentDirectory}`);
      return currentDirectory;
    }

    let absolutePath = nextDir;
    if (!path.isAbsolute(nextDir)) {
      absolutePath = path.join(currentDirectory, nextDir);
    }

    absolutePath = path.normalize(absolutePath);
    if (await isDirectory(absolutePath)) {
      console.log(`You are currently in ${absolutePath}`);
      return absolutePath;
    } else {
      console.log("Incorrect path");
      console.log(`You are currently in ${currentDirectory}`);
      return currentDirectory;
    }
  } catch (e) {
    console.log("Incorrect command");
    console.log(`You are currently in ${currentDirectory}`);
    return currentDirectory;
  }
};

export default cd;
