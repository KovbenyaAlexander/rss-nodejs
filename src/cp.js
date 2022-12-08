import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { isFolderExist } from "./utils.js";
import { pipeline } from "stream";

const cp = async (currentDirectory, pathToFile, pathToDest) => {
  try {
    if (!pathToFile || !pathToDest) {
      console.log("\n Incorrect command \n");
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

    if (!(await isFolderExist(absPathToFile))) {
      console.log("\n File for compress doesnt exist \n");
      return;
    }

    if (await isFolderExist(absPathToDest)) {
      console.log("\n Destination file already exists \n");
      return;
    }

    const rs = createReadStream(absPathToFile);
    const ws = createWriteStream(absPathToDest);

    pipeline(rs, ws, (err) => {
      if (err) {
        console.log(err);
      }
    });
    console.log("\n File copied successfully \n");
  } catch {
    console.log("\n Incorrect command \n");
  }
};

export default cp;
