import cluster from "node:cluster";
import { IncomingMessage, ServerResponse } from "http";
import balancer from "./balancer/balancer";
import router from "./router";
import { IUser } from "./types";

let developmentState: IUser[] = [];

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

    if (cluster.workers && Object.entries(cluster.workers).length) {
      if (req.url && req.method) {
        balancer({ body, url: req.url, method: req.method });
      }
      for (const worker of Object.values(cluster.workers)) {
        worker?.on("message", ({ status, msg, type }: { type: string; status: number; msg: string }) => {
          if (type === "response") {
            res.writeHead(status, { "Content-Type": "application/json" });
            res.end(JSON.stringify(msg));
          }
        });
      }
    } else {
      const { status, msg, state } = await router({ body, url: req.url, method: req.method }, developmentState);
      developmentState = state;
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(msg));
    }
  });
};

export { requestListener };
