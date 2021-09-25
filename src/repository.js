import { writeFile, readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const save = async (data) => {
  const databaseFile = resolve(__dirname, "../", "database.json");
  const currentData = JSON.parse(await readFile(databaseFile));
  currentData.push(data);
  await writeFile(databaseFile, JSON.stringify(currentData));
};
