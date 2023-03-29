import cls from "cls-hooked";
import { Sequelize } from "sequelize";
import { registerModels } from "../database/models";

export default class Database {
  constructor(environment, dbConfig) {
    this.environment = environment;
    this.dbConfig = dbConfig.production;
    this.isTestEnvironment = this.environment === "test";
  }

  async connect() {
    const namespace = cls.createNamespace("transactions-namespace");
    Sequelize.useCLS(namespace);

    const { username, password, host, port, database, dialect } = this.dbConfig;

    this.connection = new Sequelize({
      username,
      password,
      host,
      port,
      database,
      dialect,
      logging: this.isTestEnvironment ? false : console.log,
    });

    await this.connection.authenticate({ logging: false });

    if (!this.isTestEnvironment) {
      console.log("Conexión con la base de datos establecida con éxito!");
    }

    registerModels(this.connection);

    if (this.isTestEnvironment) {
      await this.sync();
    }
  }

  async disconnect() {
    await this.connection.close();
  }

  async sync() {
    await this.connection.sync({
      logging: false,
      force: this.isTestEnvironment,
    });

    if (!this.isTestEnvironment) {
      console.log("Conexión sincronizada con éxito!");
    }
  }
}
