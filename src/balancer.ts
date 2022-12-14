import os from "os";

let counter = 0;
const cpus = os.cpus().length;

const balancer = () => {
  counter++;
  if (counter % cpus === 0) counter++;
  const workerId = counter % cpus;
  return workerId;
};

export default balancer;
