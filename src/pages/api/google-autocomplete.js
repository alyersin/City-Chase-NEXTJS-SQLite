const fetch = require("node-fetch");

export default async function handler(req, res) {
  console.log("Google API Key:", process.env.GOOGLE_API_KEY);

  const { input } = req.query;

  console.log("Incoming request to /api/google-autocomplete");
  console.log("Query parameter `input`:", input);

  if (!input) {
    console.error("Input query is missing");
    return res.status(400).json({ error: "Input query is required." });
  }

  const API_KEY = process.env.GOOGLE_API_KEY;
  const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;

  console.log(
    "Using Google API Key:",
    API_KEY ? API_KEY.slice(0, 5) + "..." : "undefined"
  );

  try {
    const response = await fetch(
      `${endpoint}?input=${encodeURIComponent(
        input
      )}&types=(cities)&key=${API_KEY}`
    );

    console.log("Google API Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from Google API:", errorText);
      throw new Error("Failed to fetch data from Google Places API");
    }

    const data = await response.json();

    console.log("Google API Response Data:", JSON.stringify(data, null, 2));

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching autocomplete data:", error.message);
    res.status(500).json({ error: "Failed to fetch autocomplete suggestions" });
  }
}
