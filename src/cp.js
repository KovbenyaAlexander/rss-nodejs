import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { isFolderExist } from "./utils.js";
import { pipeline } from "stream";

const cp = async (currentDirectory, pathToFile, pathToDest) => {
  try {
    if (!pathToFile || !pathToDest) {
      console.log(`if`);
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

    const copyName = path.basename(absPathToFile);

    if (!(await isFolderExist(absPathToFile))) {
      console.log("\n File for copy doesnt exist \n");
      return;
    }

    if (await isFolderExist(`${absPathToDest}/${copyName}`)) {
      console.log("\n Destination file already exists \n");
      return;
    }

    const rs = createReadStream(absPathToFile);
    const ws = createWriteStream(`${absPathToDest}/${copyName}`);

    pipeline(rs, ws, (err) => {
      if (err) {
        console.log(`pipeline err`);
        console.log(err);
      }
    });
    console.log("\n File copied successfully \n");
  } catch (e) {
    console.log("\n Incorrect command \n");
  }
};

export default cp;
