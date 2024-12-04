const bcrypt = require("bcrypt");
const { AppDataSource } = require("../../../database/database");
const User = require("../../entities/User");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;

    try {
      console.log("Initializing database...");
      await AppDataSource.initialize();

      console.log("Fetching User repository...");
      const userRepository = AppDataSource.getRepository("User");

      console.log("Checking if user exists...");
      const existingUser = await userRepository.findOneBy({ email });
      if (existingUser) {
        console.log("User already exists!");
        return res.status(400).json({ error: "User already exists!" });
      }

      console.log("Hashing password...");
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      const newUser = userRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await userRepository.save(newUser);

      console.log("User registered successfully:", newUser);
      res.status(201).json({ success: true, user: newUser });
    } catch (error) {
      console.error("Error:", error.message);
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    } finally {
      console.log("Destroying database connection...");
      await AppDataSource.destroy();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
