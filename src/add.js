import { isFolderExist } from "./utils.js";
import { appendFile } from "node:fs/promises";

const add = async (directory, fileName) => {
  if (await isFolderExist(`${directory}/${fileName}`)) {
    console.log("File already exists");
  } else {
    appendFile(`${directory}/${fileName}`, "");
    console.log("File created successfully");
  }
};

export default add;
