import { createReadStream } from "fs";
import path from "path";

const cat = (currentDirectory, pathToFile) => {
  try {
    let absolutePath = pathToFile;
    if (!path.isAbsolute(pathToFile)) {
      absolutePath = path.join(currentDirectory, pathToFile);
    }

    absolutePath = path.normalize(absolutePath);

    const rs = createReadStream(absolutePath);

    rs.on(`readable`, () => {
      let chunk;
      while ((chunk = rs.read()) !== null) {
        process.stdout.write(chunk.toString());
      }
    });

    rs.on(`error`, (e) => {
      console.log("\nIncorrect command\n");
    });

    rs.on(`close`, (e) => {
      console.log(`\nYou are currently in ${currentDirectory}\n`);
    });
  } catch (e) {
    console.log("\nIncorrect command\n");
    console.log(`\nYou are currently in ${currentDirectory}\n`);
  }
};

export default cat;
