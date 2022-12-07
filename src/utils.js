import { access, constants, readdir } from "node:fs/promises";

export async function isFolderExist(path) {
  try {
    const res = await access(path);
    return true;
  } catch (e) {
    return false;
  }
}
