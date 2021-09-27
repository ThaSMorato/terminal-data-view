import { describe, test, expect, jest } from "@jest/globals";
import fs from "fs";
import { save } from "../src/repository";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const databaseFile = resolve(__dirname, "../", "database.json");

describe("Repository test", () => {
  test("save", async () => {
    const mockDatabase = [
      {
        id: 1,
        vehicles: ["Motocicleta", "Carro", "Caminhao"],
        kmTraveled: 10000,
        from: "2009-01-01",
        to: "2020-11-26",
      },
      {
        id: "2",
        vehicles: ["Bike", "Aviao", "Navio", "Barco"],
        kmTraveled: "500000",
        from: "2019-01-01",
        to: "2020-01-01",
      },
    ];

    const newDatabaseItem = {
      id: "3",
      vehicles: ["Skate", "Bike"],
      kmTraveled: "30000",
      from: "2020-01-01",
      to: "2020-03-01",
    };

    jest
      .spyOn(fs.promises, fs.promises.readFile.name)
      .mockResolvedValue(JSON.stringify(mockDatabase));
    jest.spyOn(fs.promises, fs.promises.writeFile.name).mockImplementation();

    await save(newDatabaseItem);

    expect(fs.promises.readFile).toHaveBeenCalled();
    expect(fs.promises.writeFile).toHaveBeenCalled();
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      databaseFile,
      JSON.stringify([...mockDatabase, newDatabaseItem])
    );
  });
});
