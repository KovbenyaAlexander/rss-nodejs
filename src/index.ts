import { requestListener } from "./server";
import os from "os";
import cluster from "cluster";
import http from "http";

const PORT = 5000;
const app = http.createServer(requestListener);

if (cluster.isPrimary) {
  const cpus = os.cpus().length;

  for (let CURRENT_PORT = PORT; CURRENT_PORT < PORT + cpus; CURRENT_PORT++) {
    cluster.fork({ CURRENT_PORT });
  }
} else {
  if (process.env.CURRENT_PORT !== undefined) {
    const PORT = process.env.CURRENT_PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}
