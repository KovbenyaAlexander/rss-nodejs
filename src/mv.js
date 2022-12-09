import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { isExist } from "./utils.js";
import { pipeline } from "stream";
import { unlink } from "node:fs/promises";

const mv = async (currentDirectory, pathToFile, pathToDest) => {
  try {
    if (!pathToFile || !pathToDest) {
      return console.log("\nIncorrect command\n");
    }

    let absPathToFile = pathToFile;
    let absPathToDest = pathToDest;

    if (!path.isAbsolute(pathToFile)) {
      absPathToFile = path.join(currentDirectory, pathToFile);
    }

    if (!path.isAbsolute(pathToDest)) {
      absPathToDest = path.join(currentDirectory, pathToDest);
    }

    const copyName = path.basename(absPathToFile);

    if (!(await isExist(absPathToFile))) {
      return console.log("\nFile for move doesnt exist\n");
    }

    if (await isExist(`${absPathToDest}/${copyName}`)) {
      return console.log("\nDestination file already exists\n");
    }

    if (!(await isExist(absPathToDest))) {
      return console.log("\nDestination path is incorrect\n");
    }

    const rs = createReadStream(absPathToFile);
    const ws = createWriteStream(`${absPathToDest}/${copyName}`);

    pipeline(rs, ws, (err) => {
      if (err) {
        console.log("\nIncorrect command\n");
      }
    });

    ws.on("close", () => {
      unlink(absPathToFile);
    });

    console.log("\nFile moved successfully\n");
  } catch (e) {
    console.log("\nIncorrect command\n");
  } finally {
    console.log(`You are currently in ${currentDirectory}`);
  }
};

export default mv;
