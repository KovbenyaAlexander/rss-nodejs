import { access, appendFile, unlink, readFile, writeFile } from "node:fs/promises";
import { UserType } from "./types";

const parseArgs = () => {
  const args = process.argv;
  const result: { [key: string]: string } = {};

  for (let i = 2; i < process.argv.length; i += 2) {
    result[`${args[i].slice(2)}`] = args[i + 1];
  }

  return result;
};

async function isExist(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch (e) {
    return false;
  }
}

const createJSON = async () => {
  const PATH = "./users_db.json";
  if (await isExist(PATH)) {
    await unlink(PATH);
  }

  await appendFile(PATH, "[]");
};

const getState = async (): Promise<UserType[]> => {
  let content = "[]";
  try {
    const PATH = "./users_db.json";
    if (await isExist(PATH)) {
      content = await readFile(PATH, "utf8");
      if (content) {
        JSON.parse(content);
        return JSON.parse(content);
      }
    }
    return JSON.parse(content);
  } catch {
    console.log(`get state error`);
    return JSON.parse(content);
  }
};

const setState = async (state: UserType[]): Promise<boolean> => {
  try {
    const PATH = "./users_db.json";
    await writeFile(PATH, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
};

export { parseArgs, isExist, createJSON, getState, setState };
