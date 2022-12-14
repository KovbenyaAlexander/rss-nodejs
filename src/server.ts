// import userController from "./userController";
import cluster from "node:cluster";
import { IncomingMessage, ServerResponse } from "http";
import { Console } from "node:console";
import balancer from "./balancer";

const requestListener = async function (req: IncomingMessage, res: ServerResponse) {
  let body: any = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    body = JSON.parse(Buffer.concat(body).toString());
    if (cluster.workers) {
      const workerId = balancer();
      console.log(`workerId - ${workerId}`);
      for (const worker of Object.values(cluster.workers)) {
        if (worker?.id === workerId) {
          worker?.send({ body, url: req.url, method: req.method });
          worker?.once("message", ({ status }: { status: number }) => {
            res.writeHead(status);
            res.end(JSON.stringify(status));
          });
        }
      }
    }
  });
};

export { requestListener };
