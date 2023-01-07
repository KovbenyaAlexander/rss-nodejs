import getNextWorkerId from "./getNextWorkerId";
import cluster from "node:cluster";

const balancer = ({ body, url, method }: { body: any; url: string; method: string }) => {
  const nextWorkerId = getNextWorkerId();

  console.log(`CURRENT WORKER #${nextWorkerId}`);

  if (cluster.workers && Object.entries(cluster.workers).length) {
    for (const worker of Object.values(cluster.workers)) {
      if (worker?.id === nextWorkerId) {
        worker?.send({ type: "request", body, url, method });
      }
    }
  }
};

export default balancer;
