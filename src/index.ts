import http from "http";
import cluster from "cluster";
import os from "os";
import router from "./router";
import { messageType } from "./types";
import { requestListener } from "./requestListener";
import { parseArgs, createJSON } from "./utils";

const PORT = Number(process.env.PORT) || 4000;
export const app = http.createServer(requestListener);
const args = parseArgs();

const init = async () => {
  if (args.hasOwnProperty("balancer")) {
    if (cluster.isPrimary) {
      await createJSON(); //create storage
      const cpus = os.cpus().length;
      app.listen(PORT, () => console.log(`Master is running on port ${PORT}`));
      for (let CURRENT_PORT = PORT + 1; CURRENT_PORT < PORT + cpus + 1; CURRENT_PORT++) {
        cluster.fork({ CURRENT_PORT });
      }
    } else {
      const PORT = process.env.CURRENT_PORT;
      const workerId = cluster.worker?.id;
      app.listen(PORT, () => console.log(`Server on port ${PORT} || worker #${workerId}`));
      process.on("message", async function (message: messageType) {
        const { status, msg } = await router(message);
        process.send && process.send({ status, msg });
      });
    }
  } else {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    await createJSON();
  }
};

init();
