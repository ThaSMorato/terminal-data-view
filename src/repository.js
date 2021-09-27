import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const save = async (data) => {
  const databaseFile = resolve(__dirname, "../", "database.json");
  const databaseData = await fs.promises.readFile(databaseFile);
  const currentData = JSON.parse(databaseData);
  currentData.push(data);
  await fs.promises.writeFile(databaseFile, JSON.stringify(currentData));
};
