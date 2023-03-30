module.exports = {
  development: {
    username: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASSWORD,
    host: process.env.DB_DEV_HOST,
    port: parseInt(process.env.DB_DEV_PORT),
    database: process.env.DB_DEV_NAME,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASSWORD,
    host: process.env.DB_TEST_HOST,
    port: parseInt(process.env.DB_TEST_PORT),
    database: process.env.DB_TEST_NAME,
    dialect: "postgres",
  },
  get production() {
    const username = encodeURIComponent(process.env.DB_USER);
    const password = encodeURIComponent(process.env.DB_PASSWORD);
    const host = process.env.DB_HOST;
    const port = parseInt(process.env.DB_PORT);
    const database = process.env.DB_NAME;

    return {
      username,
      password,
      host,
      port,
      database,
      get url() {
        return `postgresql://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`;
      },
      dialect: "postgres",
    };
  },
};
