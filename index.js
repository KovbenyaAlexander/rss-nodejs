import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import os from "os";
import up from "./src/up.js";
import cd from "./src/cd.js";
import ls from "./src/ls.js";
import cat from "./src/cat.js";
import add from "./src/add.js";
import cp from "./src/cp.js";
import rn from "./src/rn.js";
import rm from "./src/rm.js";
import osInfo from "./src/os.js";
import hash from "./src/hash.js";
import mv from "./src/mv.js";
import { compress, decompress } from "./src/compress.js";

/*
  npm run start -- --username=your_username
*/

const rl = readline.createInterface({ input, output });

let currentDirectory = os.homedir();
const username = process.argv[2].split(`=`)[1];

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentDirectory}`);

rl.on("line", async (input) => {
  const withoutExtraSpaces = input.replace(/\s+/g, " ").trim();

  const command = withoutExtraSpaces.trim().split(` `)[0];
  const firstParam = withoutExtraSpaces.trim().split(` `)[1];
  const secondParam = withoutExtraSpaces.trim().split(` `)[2];

  switch (command) {
    case "up": {
      currentDirectory = up(currentDirectory);
      break;
    }
    case "cd": {
      currentDirectory = await cd(currentDirectory, firstParam);
      break;
    }
    case "ls": {
      await ls(currentDirectory);
      break;
    }
    case "cat": {
      cat(currentDirectory, firstParam);
      break;
    }
    case "add": {
      await add(currentDirectory, firstParam);
      break;
    }
    case "cp": {
      cp(currentDirectory, firstParam, secondParam);
      break;
    }
    case "rn": {
      await rn(currentDirectory, firstParam, secondParam);
      break;
    }
    case "rm": {
      await rm(currentDirectory, firstParam);
      break;
    }
    case "mv": {
      mv(currentDirectory, firstParam, secondParam);
      break;
    }
    case "os": {
      osInfo(currentDirectory, firstParam);
      break;
    }
    case "hash": {
      await hash(currentDirectory, firstParam);
      break;
    }
    case "compress": {
      await compress(currentDirectory, firstParam, secondParam);
      break;
    }
    case "decompress": {
      await decompress(currentDirectory, firstParam, secondParam);
      break;
    }
    case "": {
      console.log(`You are currently in ${currentDirectory}`);
      break;
    }
    default:
      console.log("\nIncorrect command'\n");
  }
});

rl.on("close", () => {
  console.log(`\nThank you for using File Manager, ${username} goodbye!`);
});
