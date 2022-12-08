import os from "os";

const osInfo = (currentDirectory, param) => {
  switch (param) {
    case "--EOL": {
      console.log("\n" + JSON.stringify(os.EOL) + "\n");
      break;
    }
    case "--cpus": {
      console.log(os.cpus());
      break;
    }
    case "--homedir": {
      console.log("\n" + os.homedir() + "\n");
      break;
    }
    case "--username": {
      console.log("\n" + os.userInfo().username + "\n");
      break;
    }
    case "--architecture": {
      console.log("\n" + os.arch() + "\n");
      break;
    }
  }
  console.log(`You are currently in ${currentDirectory}`);
};

export default osInfo;
