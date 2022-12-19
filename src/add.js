import { isExist } from "./utils.js";
import { appendFile } from "node:fs/promises";
import path from "path";

const add = async (directory, fileName) => {
  try {
    if (!fileName) {
      return console.log("\nIncorrect command\n");
    }

    let absolutePath = fileName;
    if (!path.isAbsolute(fileName)) {
      absolutePath = path.join(directory, fileName);
    }
    absolutePath = path.normalize(absolutePath);

    if (await isExist(absolutePath)) {
      console.log("\nFile already exists\n");
      console.log(`You are currently in ${directory}`);
    } else {
      appendFile(absolutePath, "");
      console.log("\nFile created successfully\n");
      console.log(`\nYou are currently in ${directory}\n`);
    }
  } catch {
    console.log("\nIncorrect command\n");
    console.log(`\nYou are currently in ${directory}\n`);
  }
};

export default add;
