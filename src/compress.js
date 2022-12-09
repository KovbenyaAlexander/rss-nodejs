import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { isExist, isDirectory } from "./utils.js";
import { pipeline } from "stream";

const compress = async (currentDirectory, pathToFile, pathToDest) => {
  try {
    if (!pathToFile || !pathToDest) {
      return console.log("\n Incorrect command \n");
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
      return console.log("\nFile for compress doesnt exist\n");
    }

    if (!(await isDirectory(absPathToDest))) {
      return console.log("\nDestination path is not a directory\n");
    }

    const base = path.win32.basename(absPathToFile);

    if (await isExist(path.join(absPathToDest, base))) {
      return console.log("\nDestination file already esists\n");
    }

    const rs = createReadStream(absPathToFile);
    const ws = createWriteStream(path.join(absPathToDest, base));
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
  } finally {
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
      console.log("\nFile for decompress doesnt exist\n");
      return;
    }

    if (!(await isDirectory(absPathToDest))) {
      console.log("\nDestination path is not a directory\n");
      return;
    }

    const base = path.win32.basename(absPathToFile);

    if (await isExist(path.join(absPathToDest, base))) {
      return console.log("\nDestination file already esists\n");
    }

    const rs = createReadStream(absPathToFile);
    const ws = createWriteStream(path.join(absPathToDest, base));
    const brotli = createBrotliDecompress();

    pipeline(rs, brotli, ws, (err) => {
      if (err) {
        console.log(err);
      }
    });
    console.log("\nFile decompressed successfully\n");
  } catch {
    console.log("\nIncorrect command");
    console.log(`\nYou are currently in ${currentDirectory}\n`);
  } finally {
    console.log(`\nYou are currently in ${currentDirectory}\n`);
  }
};

export { compress, decompress };
