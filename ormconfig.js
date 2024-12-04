module.exports = {
  type: "sqlite",
  database: "./database/cityChase.db",
  synchronize: true,
  logging: true,
  entities: ["src/entities/**/*.js"],
};
