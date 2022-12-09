import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { isExist } from "./utils.js";
import { pipeline } from "stream";

const compress = async (currentDirectory, pathToFile, pathToDest) => {
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

    if (!(await isExist(absPathToFile))) {
      console.log("\nFile for compress doesnt exist\n");
      return;
    }

    if (await isExist(absPathToDest)) {
      console.log("\nDestination file already exists\n");
      return;
    }

    const rs = createReadStream(absPathToFile);
    const ws = createWriteStream(absPathToDest);
    const brotli = createBrotliCompress();

    pipeline(rs, brotli, ws, (err) => {
      if (err) {
        console.log(err);
      }
    });
    console.log("\nFile compressed successfully\n");
  } catch {
    console.log("\nIncorrect command\n");
    console.log(`\nYou are currently in ${currentDirectory}\n`);
  }
};

const decompress = async (currentDirectory, pathToFile, pathToDest) => {
  try {
    let absPathToFile = pathToFile;
    let absPathToDest = pathToDest;

    if (!path.isAbsolute(pathToFile)) {
      absPathToFile = path.join(currentDirectory, pathToFile);
    }

    if (!path.isAbsolute(pathToDest)) {
      absPathToDest = path.join(currentDirectory, pathToDest);
    }

    if (!(await isExist(absPathToFile))) {
      console.log("\nFile for compress doesnt exist\n");
      return;
    }

    if (await isExist(absPathToDest)) {
      console.log("\nDestination file already exists\n");
      return;
    }

    const rs = createReadStream(absPathToFile);
    const ws = createWriteStream(absPathToDest);
    const brotli = createBrotliDecompress();

    pipeline(rs, brotli, ws, (err) => {
      if (err) {
        console.log(err);
      }
    });
    console.log("\nFile decompressed successfully\n");
  } catch {
    console.log("\nIncorrect command\n");
    console.log(`\nYou are currently in ${directory}\n`);
  }
};

export { compress, decompress };
