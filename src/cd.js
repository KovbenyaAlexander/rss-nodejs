import path from "path";
import { isFolderExist } from "./utils.js";

const cd = async (currentDir, nextDir) => {
  if (path.isAbsolute(nextDir)) {
    if (await isFolderExist(nextDir)) {
      console.log(`You are currently in ${nextDir}`);
      return nextDir;
    } else {
      console.log(`Folder doesnt exist`);
    }
  } else {
    if (await isFolderExist(`${currentDir}/${nextDir}`)) {
      const newPath = path.join(currentDir, nextDir);
      console.log(`You are currently in ${newPath}`);
      return newPath;
    } else {
      console.log(`Folder doesnt exist`);
    }
  }
};

export default cd;
