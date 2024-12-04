import jwt from "jsonwebtoken";
import { AppDataSource } from "../../../database/database";
const Favorite = require("../../entities/Favorite");
const User = require("../../entities/User");

const JWT_SECRET = "your-secret-key";

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error("No authorization header provided.");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  let userId;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token verified:", decoded);
    userId = decoded.id;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    await AppDataSource.initialize();

    const favoriteRepository = AppDataSource.getRepository(Favorite);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return res.status(404).json({ error: "User not found." });
    }

    if (req.method === "POST") {
      const { cityDetails } = req.body;

      if (!cityDetails || !cityDetails.name) {
        console.error("Invalid city details provided.");
        return res
          .status(400)
          .json({ error: "Invalid city details provided." });
      }

      console.log(`Adding city to favorites for user: ${userId}`, cityDetails);

      const isAlreadyFavorite = await favoriteRepository.findOne({
        where: {
          user: { id: userId },
          name: cityDetails.name,
        },
      });

      if (isAlreadyFavorite) {
        console.error("City is already in favorites.");
        return res.status(409).json({ error: "City is already in favorites." });
      }

      const newFavorite = favoriteRepository.create({
        ...cityDetails,
        user,
      });

      await favoriteRepository.save(newFavorite);
      return res
        .status(201)
        .json({ message: "City added to favorites successfully." });
    } else if (req.method === "GET") {
      console.log(`Fetching favorites for user: ${userId}`);

      const favorites = await favoriteRepository.find({
        where: { user: { id: userId } },
      });

      return res.status(200).json({ favorites });
    }

    return res.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    console.error("Database error:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  } finally {
    await AppDataSource.destroy();
  }
}
