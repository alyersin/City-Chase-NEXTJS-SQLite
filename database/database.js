const { DataSource } = require("typeorm");
const User = require("./entities/User"); // Adjust this to match your structure
const Favorite = require("./entities/Favorite");

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./database.sqlite",
  entities: [User, Favorite],
  synchronize: true,
});

module.exports = { AppDataSource };
