import cluster from "node:cluster";
import { IncomingMessage, ServerResponse } from "http";
import balancer from "./balancer";
import router from "./router";

const requestListener = async function (req: IncomingMessage, res: ServerResponse) {
  let body: any = [];
  res.setHeader("Content-Type", "application/json");

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", async () => {
    try {
      if (req.method === "POST" || req.method === "PUT") {
        body = JSON.parse(Buffer.concat(body).toString());
      }
    } catch {
      res.writeHead(400);
      res.end(`invalid JSON`);
      return;
    }
    if (cluster.workers && Object.entries(cluster.workers).length) {
      const workerId = balancer();
      for (const worker of Object.values(cluster.workers)) {
        if (worker?.id === workerId) {
          worker?.send({ body, url: req.url, method: req.method });
          worker?.once("message", ({ status, msg }: { status: number; msg: string }) => {
            res.writeHead(status);
            res.end(msg);
          });
        }
      }
    } else {
      const { status, msg } = await router({ body, url: req.url, method: req.method });
      res.writeHead(status);
      res.end(msg);
    }
  });
};

export { requestListener };
