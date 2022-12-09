import { createReadStream } from "fs";

const cat = (directory, fileName) => {
  try {
    const rs = createReadStream(`${directory}/${fileName}`);

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
      console.log(`\nYou are currently in ${directory}\n`);
    });
  } catch {
    console.log("\nIncorrect command\n");
    console.log(`\nYou are currently in ${directory}\n`);
  }
};

export default cat;
