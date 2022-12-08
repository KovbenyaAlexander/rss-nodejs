import { isFolderExist } from "./utils.js";
import { appendFile } from "node:fs/promises";
import path from "path";

const add = async (directory, fileName) => {
  if (path.isAbsolute(fileName)) {
    if (await isFolderExist(`${fileName}`)) {
      console.log("\nFile already exists\n");
    } else {
      appendFile(`${fileName}`, "");
      console.log("\nFile created successfully\n");
    }
  } else {
    if (await isFolderExist(`${directory}/${fileName}`)) {
      console.log("\nFile already exists\n");
    } else {
      appendFile(`${directory}/${fileName}`, "");
      console.log("\nFile created successfully\n");
    }
  }
};

export default add;
