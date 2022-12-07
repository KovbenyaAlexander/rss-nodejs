import path from "path";
import { isFolderExist } from "./utils.js";

const cd = async (currentDir, nextDir) => {
  if (await isFolderExist(currentDir, nextDir)) {
    const newPath = path.join(currentDir, nextDir);
    console.log(`You are currently in ${newPath}`);
    return newPath;
  } else {
    console.log(`Folder doesnt exist`);
    return currentDir;
  }
};

export default cd;
