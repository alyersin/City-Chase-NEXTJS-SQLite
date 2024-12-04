const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AppDataSource } = require("../../../database/database");
const User = require("../../entities/User");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      await AppDataSource.initialize();
      console.log("Database connection initialized.");

      const userRepository = AppDataSource.getRepository("User");

      const user = await userRepository.findOneBy({ email });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials!" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log("Token generated:", token);
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await AppDataSource.destroy();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
