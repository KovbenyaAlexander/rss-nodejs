import { isFolderExist } from "./utils.js";
import { unlink } from "node:fs/promises";
import path from "path";

const rm = async (currentDirectory, fileName, newName) => {
  if (path.isAbsolute(fileName)) {
    if (await isFolderExist(fileName)) {
      unlink(fileName, path.join(fileName));
      console.log("\nFile deleted successfully\n");
    } else {
      console.log("\nFile doesnt exists\n");
    }
  } else {
    if (await isFolderExist(`${currentDirectory}/${fileName}`)) {
      unlink(`${currentDirectory}/${fileName}`, `${currentDirectory}/${newName}`);
      console.log("\nFile deleted successfully\n");
    } else {
      console.log("\nFile doesnt exists\n");
    }
  }
  console.log(`\nYou are currently in ${currentDirectory}\n`);
};

export default rm;
