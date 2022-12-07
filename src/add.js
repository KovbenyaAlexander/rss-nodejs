import { isFolderExist } from "./utils.js";
import { appendFile } from "node:fs/promises";
import path from "path";

const add = async (directory, fileName) => {
  if (path.isAbsolute(fileName)) {
    if (await isFolderExist(`${fileName}`)) {
      console.log("File already exists");
    } else {
      appendFile(`${fileName}`, "");
      console.log("File created successfully");
    }
  } else {
    if (await isFolderExist(`${directory}/${fileName}`)) {
      console.log("File already exists");
    } else {
      appendFile(`${directory}/${fileName}`, "");
      console.log("File created successfully");
    }
  }
};

export default add;
