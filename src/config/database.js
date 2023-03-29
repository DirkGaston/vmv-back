module.exports = {
  development: {
    username: process.env.DB_USER || "vmv",
    password: process.env.DB_PASSWORD || "garroshino666",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "vmv",
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_TEST_USER || "postgres",
    password: process.env.DB_TEST_PASSWORD || "postgres",
    host: process.env.DB_TEST_HOST || "localhost",
    port: parseInt(process.env.DB_TEST_PORT) || 5433,
    database: process.env.DB_TEST_NAME || "postgres",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER || "vmv",
    password: process.env.DB_PASSWORD || "garroshino666",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "vmv",
    dialect: "postgres",
  },
};
