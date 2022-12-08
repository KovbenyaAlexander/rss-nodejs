import { isFolderExist } from "./utils.js";
import { rename } from "node:fs/promises";
import path from "path";

const rn = async (currentDirectory, pathToFile, newName) => {
  let absolutePath = pathToFile;
  if (!path.isAbsolute(pathToFile)) {
    absolutePath = path.join(currentDirectory, pathToFile);
  }
  absolutePath = path.normalize(absolutePath);

  if (await isFolderExist(absolutePath)) {
    rename(absolutePath, path.join(absolutePath, `..`, newName));
    console.log("\nFile renamed successfully\n");
  } else {
    console.log("\nFile doesnt exists\n");
  }
};

export default rn;
