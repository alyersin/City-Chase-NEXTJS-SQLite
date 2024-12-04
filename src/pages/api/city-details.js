import axios from "axios";

export default async function handler(req, res) {
  const { cityName } = req.query;

  if (!cityName) {
    console.error("API Handler: Missing city name.");
    return res.status(400).json({ error: "City name is required." });
  }

  console.log("API Handler: Fetching details for city:", cityName);

  const API_KEY = process.env.GOOGLE_API_KEY;

  if (!API_KEY) {
    console.error("API Handler: Missing Google API Key.");
    return res
      .status(500)
      .json({ error: "Internal Server Error: Missing API Key." });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`;
    const response = await axios.get(url, {
      params: {
        input: cityName,
        inputtype: "textquery",
        fields: "geometry,formatted_address,name",
        key: API_KEY,
      },
    });

    console.log("API Handler: Response data:", response.data);

    if (!response.data.candidates || response.data.candidates.length === 0) {
      return res.status(404).json({ error: "City details not found." });
    }

    const city = response.data.candidates[0];
    const cityDetails = {
      name: city.name || "Unknown",
      country: city.formatted_address
        ? city.formatted_address.split(",").pop().trim()
        : "Unknown",
      latitude: city.geometry?.location?.lat || "Unknown",
      longitude: city.geometry?.location?.lng || "Unknown",
      population: "Unknown",
      timeZone: "Unknown",
    };

    res.status(200).json(cityDetails);
  } catch (error) {
    console.error("API Handler: Error fetching city details:", error.message);
    res.status(500).json({ error: "Failed to fetch city details." });
  }
}
