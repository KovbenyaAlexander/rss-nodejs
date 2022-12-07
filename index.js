import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import os from "os";
import up from "./src/up.js";
/*
  npm run start -- --username=your_username
*/

const rl = readline.createInterface({ input, output });

let currentDirectory = os.homedir();
const username = process.argv[2].split(`=`)[1];

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentDirectory}`);

rl.on("line", (input) => {
  const command = input.trim().split(` `)[0];
  const firstParam = input.trim().split(` `)[1];
  const secondParam = input.trim().split(` `)[2];

  switch (command) {
    case "up": {
      currentDirectory = up(currentDirectory);
      console.log(`You are currently in ${currentDirectory}`);
      break;
    }
    default:
      console.log(`Incorrect command.`);
  }
});

rl.on(`close`, () => {
  console.log(`Thank you for using File Manager, ${username} goodbye!`);
});
