import path from "path";

const up = (oldPath) => {
  console.log(`\nYou are currently in ${path.join(oldPath, `..`)}\n`);
  return path.join(oldPath, `..`);
};

export default up;
