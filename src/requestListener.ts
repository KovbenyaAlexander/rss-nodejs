import cluster from "node:cluster";
import { IncomingMessage, ServerResponse } from "http";
import balancer from "./balancer/balancer";
import router from "./router";

const requestListener = async function (req: IncomingMessage, res: ServerResponse) {
  let body: any = [];

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

    if (!req.url || !req.method) {
      res.writeHead(400);
      res.end(`invalid request`);
      return;
    }

    balancer({ body, url: req.url, method: req.method });

    if (cluster.workers && Object.entries(cluster.workers).length) {
      for (const worker of Object.values(cluster.workers)) {
        worker?.once("message", ({ status, msg }: { status: number; msg: string }) => {
          res.writeHead(status, { "Content-Type": "application/json" });
          res.end(msg);
        });
      }
    } else {
      const { status, msg } = await router({ body, url: req.url, method: req.method });
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(msg));
    }
  });
};

export { requestListener };
