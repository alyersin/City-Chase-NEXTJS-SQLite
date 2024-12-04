const { AppDataSource } = require("../database/database");

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  } finally {
    await AppDataSource.destroy();
  }
})();
