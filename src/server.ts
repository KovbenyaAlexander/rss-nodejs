// import userController from "./userController";
import cluster from "cluster";

const requestListener = function (req: any, res: any) {
  if (cluster.isWorker) {
    console.log(cluster.worker?.id);
  }
};

export { requestListener };
