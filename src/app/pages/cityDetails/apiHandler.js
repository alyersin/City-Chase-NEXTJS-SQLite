import axios from "axios";

export default async function handler(req, res) {
  const { cityName } = req.query;

  if (!cityName) {
    console.error("API Handler: Missing city name.");
    return res.status(400).json({ error: "City name is required." });
  }

  console.log("API Handler: Fetching details for city:", cityName);

  try {
    const response = await axios.get(
      `https://api.example.com/city?name=${encodeURIComponent(cityName)}`
    );

    console.log("API Handler: Response data:", response.data);

    if (!response.data) {
      return res.status(404).json({ error: "City details not found." });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error("API Handler: Error fetching city details:", error.message);
    res.status(500).json({ error: "Failed to fetch city details." });
  }
}
