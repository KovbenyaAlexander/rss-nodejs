import path from "path";

const up = (oldPath) => {
  return path.join(oldPath, `..`);
};

export default up;
