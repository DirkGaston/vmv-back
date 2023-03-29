import "./config";
import Database from "./database";
import environment from "./config/env.config";
import dbConfig from "./config/database";

// IIFE = Immediately Invoked Function Expression
(async () => {
  try {
    const db = new Database(environment.nodeEnv, dbConfig);
    await db.connect();

    const App = require("./app").default;
    const app = new App();
    app.listen();
  } catch (err) {
    console.error("Hubo un error al inicializar el servidor:\n", err.stack);
  }
})();
