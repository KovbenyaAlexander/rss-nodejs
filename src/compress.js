import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { isFolderExist } from "./utils.js";
import { pipeline } from "stream";

const compress = async (currentDirectory, pathToFile, pathToDest) => {
  let absPathToFile = pathToFile;
  let absPathToDest = pathToDest;
  if (!path.isAbsolute(pathToFile)) {
    absPathToFile = path.join(currentDirectory, pathToFile);
  }

  if (!path.isAbsolute(pathToDest)) {
    absPathToDest = path.join(currentDirectory, pathToDest);
  }

  if (!(await isFolderExist(absPathToFile))) {
    console.log("File for compress doesnt exist");
    return;
  }

  if (await isFolderExist(absPathToDest)) {
    console.log("Destination file already exists");
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
};

const decompress = async (currentDirectory, pathToFile, pathToDest) => {
  let absPathToFile = pathToFile;
  let absPathToDest = pathToDest;

  if (!path.isAbsolute(pathToFile)) {
    absPathToFile = path.join(currentDirectory, pathToFile);
  }

  if (!path.isAbsolute(pathToDest)) {
    absPathToDest = path.join(currentDirectory, pathToDest);
  }

  if (!(await isFolderExist(absPathToFile))) {
    console.log("File for compress doesnt exist");
    return;
  }

  if (await isFolderExist(absPathToDest)) {
    console.log("Destination file already exists");
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
};

export { compress, decompress };
