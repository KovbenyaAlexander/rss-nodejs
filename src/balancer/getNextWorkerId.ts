import os from "os";

let counter = 1;
const cpus = os.cpus().length;

const getNextWorkerId = () => {
  if (counter <= cpus) {
    return counter++;
  } else {
    counter = 1;
    return counter++;
  }
};

export default getNextWorkerId;
