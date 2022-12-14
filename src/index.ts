import { requestListener } from "./server";
import os from "os";
import cluster from "cluster";
import http from "http";

const PORT = 5000;
const app = http.createServer(requestListener);

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
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Worker #${cluster.worker?.id}`);
    });

    process.on("message", function (message: any) {
      if (process.send) {
        process.send({ status: 200 });
      }
    });
  }
}
