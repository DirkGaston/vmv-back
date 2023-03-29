import ExpressLoader from "./loaders/expressLoader";
import environment from "./config/env.config";

export default class App {
  constructor() {
    this.expressLoader = new ExpressLoader();
    this.app = this.expressLoader.getApp();
  }

  listen() {
    const { port } = environment;
    this.app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  }
}
