import { isExist } from "./utils.js";
import path from "path";
import { readFile } from "node:fs/promises";
import { createHmac } from "node:crypto";

const hash = async (currentDirectory, pathToFile) => {
  try {
    if (path.isAbsolute(pathToFile)) {
      if (await isExist(pathToFile)) {
        const content = await readFile(pathToFile, { encoding: "utf-8" });
        const hash = createHmac("sha256", content).digest("hex");
        console.log("\n" + hash + "\n");
      } else {
        console.log(`\nFile not found\n`);
      }
    } else {
      if (await isExist(`${currentDirectory}/${pathToFile}`)) {
        const relativePath = path.join(currentDirectory, pathToFile);
        const content = await readFile(relativePath, { encoding: "utf-8" });
        const hash = createHmac("sha256", content).digest("hex");
        console.log("\n" + hash + "\n");
      } else {
        console.log(`file not found`);
      }
    }
  } catch {
    console.log("\nfile not found\n");
  } finally {
    console.log(`\nYou are currently in ${currentDirectory}\n`);
  }
};

export default hash;
