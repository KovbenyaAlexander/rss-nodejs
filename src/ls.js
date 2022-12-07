import { readdir } from "node:fs/promises";

const ls = async (directory) => {
  const fileList = await readdir(directory);

  const folders = [];
  const files = [];

  for (let item of fileList) {
    try {
      await readdir(`${directory}/${item}`);
      folders.push({ name: item, type: `directory` });
    } catch {
      files.push({ name: item, type: `file` });
    }
  }

  console.table([...folders.sort(), ...files.sort()]);
};

export default ls;
