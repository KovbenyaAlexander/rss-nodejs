import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { isFolderExist } from "./utils.js";
import { pipeline } from "stream";
import { unlink } from "node:fs/promises";

const mv = async (currentDirectory, pathToFile, pathToDest) => {
  try {
    if (!pathToFile || !pathToDest) {
      console.log("\nIncorrect command\n");
      return;
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

    if (!(await isFolderExist(absPathToFile))) {
      console.log("\nFile for move doesnt exist\n");
      return;
    }

    if (await isFolderExist(`${absPathToDest}/${copyName}`)) {
      console.log("\nDestination file already exists\n");
      return;
    }

    const rs = createReadStream(absPathToFile);
    const ws = createWriteStream(`${absPathToDest}/${copyName}`);

    pipeline(rs, ws, (err) => {
      if (err) {
        console.log(err);
      }
    });

    ws.on("close", () => {
      unlink(absPathToFile);
    });

    console.log("\nFile moved successfully\n");
  } catch (e) {
    console.log("\nIncorrect command\n");
  }
};

export default mv;
