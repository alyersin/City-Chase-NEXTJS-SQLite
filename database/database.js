const { DataSource } = require("typeorm");
const User = require("../src/entities/User");
const Favorite = require("../src/entities/Favorite");

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./database/cityChase.db",
  entities: [User, Favorite],
  synchronize: true,
});

module.exports = { AppDataSource };
