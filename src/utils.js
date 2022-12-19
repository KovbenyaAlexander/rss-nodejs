import { access, constants, readdir, lstat } from "node:fs/promises";

export async function isExist(path) {
  try {
    const res = await access(path);
    return true;
  } catch (e) {
    return false;
  }
}

export async function isDirectory(path) {
  try {
    return (await lstat(path)).isDirectory();
  } catch (e) {
    return false;
  }
}
