import { isFolderExist } from "./utils.js";
import { unlink } from "node:fs/promises";
import path from "path";

const rm = async (currentDirectory, fileName, newName) => {
  if (path.isAbsolute(fileName)) {
    if (await isFolderExist(fileName)) {
      unlink(fileName, path.join(fileName));
      console.log("file deleted successfully");
    } else {
      console.log("File doesnt exists");
    }
  } else {
    if (await isFolderExist(`${currentDirectory}/${fileName}`)) {
      unlink(`${currentDirectory}/${fileName}`, `${currentDirectory}/${newName}`);
      console.log("file deleted successfully");
    } else {
      console.log("File doesnt exists");
    }
  }
  console.log(`You are currently in ${currentDirectory}`);
};

export default rm;
