import { isFolderExist } from "./utils.js";
import path from "path";
import { readFile } from "node:fs/promises";
import { createHmac } from "node:crypto";

const hash = async (currentDirectory, pathToFile) => {
  try {
    if (path.isAbsolute(pathToFile)) {
      if (await isFolderExist(pathToFile)) {
        const content = await readFile(pathToFile, { encoding: "utf-8" });
        const hash = createHmac("sha256", content).digest("hex");
        console.log("\n" + hash + "\n");
      } else {
        console.log(`file not found`);
      }
    } else {
      if (await isFolderExist(`${currentDirectory}/${pathToFile}`)) {
        const relativePath = path.join(currentDirectory, pathToFile);
        const content = await readFile(relativePath, { encoding: "utf-8" });
        const hash = createHmac("sha256", content).digest("hex");
        console.log("\n" + hash + "\n");
      } else {
        console.log(`file not found`);
      }
    }
  } catch {
    console.log(`file not found`);
  } finally {
    console.log(`You are currently in ${currentDirectory}`);
  }
};

export default hash;
