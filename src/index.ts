import { requestListener } from "./requestListener";
import os from "os";
import cluster from "cluster";
import http from "http";
import { parseArgs } from "./utils";
import router from "./router";
import { messageType } from "./types";

const PORT = Number(process.env.PORT) || 4000;
const app = http.createServer(requestListener);
const args = parseArgs();

if (args.hasOwnProperty("multi")) {
  if (cluster.isPrimary) {
    const cpus = os.cpus().length;

    app.listen(PORT, () => {
      console.log(`Master is running on port ${PORT}`);
    });

    for (let CURRENT_PORT = PORT + 1; CURRENT_PORT < PORT + cpus + 1; CURRENT_PORT++) {
      cluster.fork({ CURRENT_PORT });
    }
  } else {
    if (process.env.CURRENT_PORT !== undefined) {
      const PORT = process.env.CURRENT_PORT;
      const workerId = cluster.worker?.id;
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} || worker #${workerId}`);
      });

      process.on("message", function (message: messageType) {
        const { status, msg } = router(message);
        if (process.send) {
          console.log(`it was warker #${workerId}`);
          process.send({ status, msg });
        }
      });
    }
  }
}
