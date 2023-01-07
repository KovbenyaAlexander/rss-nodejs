import http from "http";
import cluster from "cluster";
import os from "os";
import router from "./router";
import { messageType, StateType } from "./types";
import { requestListener } from "./requestListener";
import { parseArgs, createJSON } from "./utils";

const PORT = Number(process.env.PORT) || 4000;
export const app = http.createServer(requestListener);
const args = parseArgs();

const init = async () => {
  if (args.hasOwnProperty("balancer")) {
    if (cluster.isPrimary) {
      const cpus = os.cpus().length;
      app.listen(PORT, () => console.log(`Master is running on port ${PORT}`));

      let state: StateType = [];

      for (let CURRENT_PORT = PORT + 1; CURRENT_PORT < PORT + cpus + 1; CURRENT_PORT++) {
        const worker = cluster.fork({ CURRENT_PORT });
        worker.on("message", function (msg) {
          if (msg.type === "getState") {
            worker.send({ type: "state", state });
          }
          if (msg.type === "updateState") {
            state = msg.state;
          }
        });
      }
    } else {
      const PORT = process.env.CURRENT_PORT;
      const workerId = cluster.worker?.id;
      app.listen(PORT, () => console.log(`Server on port ${PORT} || worker #${workerId}`));

      process.on("message", async function (message: any) {
        if (message.type === "request") {
          process.send && process.send({ type: "getState" });
          process.once("message", async function (message_: any) {
            if (message_.type === "state") {
              const { status, msg, state } = await router(message, message_.state);
              process.send && process.send({ type: "updateState", state });
              process.send && process.send({ type: "res", status, msg });
            }
          });
        }
      });
    }
  } else {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    await createJSON();
  }
};

init();
