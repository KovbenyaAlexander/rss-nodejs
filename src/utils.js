import { access, constants, readdir } from "node:fs/promises";

export async function isFolderExist(PATH, add) {
  try {
    const res = await access(`${PATH}/${add}`);
    return true;
  } catch (e) {
    return false;
  }
}
