import database from "../database.json";
import Person from "./person.js";
import { save } from "./repository.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANG = "pt-BR";
const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

const mainLoop = async () => {
  try {
    const answer = await terminalController.question("New data:\n");

    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log("Process finished!!");
      return;
    }
    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted(DEFAULT_LANG));
    save(person);
    return mainLoop();
  } catch (e) {
    console.error({ e });
    return mainLoop();
  }
};

await mainLoop();
