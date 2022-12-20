import getNextWorkerId from "./getNextWorkerId";
import cluster from "node:cluster";

const balancer = ({ body, url, method }: { body: any; url: string; method: string }) => {
  const nextWorkerId = getNextWorkerId();

  if (cluster.workers && Object.entries(cluster.workers).length) {
    for (const worker of Object.values(cluster.workers)) {
      if (worker?.id === nextWorkerId) {
        console.log(`Current workerID - #${worker?.id}`);
        worker?.send({ body, url, method });
      }
    }
  }
};

export default balancer;
