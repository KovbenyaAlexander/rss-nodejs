import { isFolderExist } from "./utils.js";
import { rename } from "node:fs/promises";
import path from "path";

const rn = async (directory, fileName, newName) => {
  if (path.isAbsolute(fileName)) {
    if (await isFolderExist(fileName)) {
      rename(fileName, path.join(fileName, `..`, newName));
      console.log("file renamed successfully");
    } else {
      console.log("File doesnt exists");
    }
  } else {
    if (await isFolderExist(`${directory}/${fileName}`)) {
      rename(`${directory}/${fileName}`, `${directory}/${newName}`);
      console.log("file renamed successfully");
    } else {
      console.log("File doesnt exists");
    }
  }
};

export default rn;
