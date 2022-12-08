import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { isFolderExist } from "./utils.js";
import { pipeline } from "stream";

const cp = async (currentDirectory, pathToFile, pathToDest) => {
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
      console.log("\nFile for copy doesnt exist\n");
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
    console.log("\nFile copied successfully\n");
  } catch (e) {
    console.log("\nIncorrect command\n");
  }
};

export default cp;
