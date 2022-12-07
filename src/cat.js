import { createReadStream } from "fs";

const cat = (directory, fileName) => {
  const rs = createReadStream(`${directory}/${fileName}`);

  rs.on(`readable`, () => {
    let chunk;
    while ((chunk = rs.read()) !== null) {
      process.stdout.write(chunk.toString());
    }
  });

  rs.on(`error`, (e) => {
    console.log(e);
  });

  rs.on(`close`, (e) => {
    console.log(`\nYou are currently in ${directory}`);
  });
};

export default cat;
