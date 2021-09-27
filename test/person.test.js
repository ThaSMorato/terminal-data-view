import { describe, test, expect } from "@jest/globals";
import Person from "../src/person.js";

describe("Person test", () => {
  test("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString("2 Skate,Bike 100000 2019-02-01 2021-05-04");
    const expected = new Person({
      from: "2019-02-01",
      to: "2021-05-04",
      vehicles: ["Skate", "Bike"],
      kmTraveled: "100000",
      id: "2",
    });

    expect(person).toStrictEqual(expected);
  });

  test("should formart values from an instance", () => {
    const person = new Person({
      from: "2019-02-01",
      to: "2021-05-04",
      vehicles: ["Skate", "Bike"],
      kmTraveled: "100000",
      id: "2",
    });

    const result = person.formatted("pt-BR");

    const expected = {
      from: "01 de fevereiro de 2019",
      to: "04 de maio de 2021",
      vehicles: "Skate e Bike",
      kmTraveled: "100.000 km",
      id: 2,
    };

    expect(result).toStrictEqual(expected);
  });
});
