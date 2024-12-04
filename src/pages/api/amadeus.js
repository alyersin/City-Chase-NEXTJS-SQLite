import axios from "axios";
import qs from "qs"; // Import the qs library for URL encoding

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

let token = null;

// Fetch access token from Amadeus
async function getAccessToken() {
  const authUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

  try {
    const payload = qs.stringify({
      grant_type: "client_credentials",
      client_id: AMADEUS_API_KEY,
      client_secret: AMADEUS_API_SECRET,
    });

    const response = await axios.post(authUrl, payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    token = response.data.access_token;
    console.log("Access token retrieved successfully:", token);
  } catch (error) {
    console.error(
      "Failed to fetch access token:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch access token from Amadeus API.");
  }
}

async function getCityDetails(cityName) {
  const endpoint = "https://test.api.amadeus.com/v1/reference-data/locations";
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        keyword: cityName,
        subType: "CITY",
      },
    });

    const city = response.data.data[0];
    if (city) {
      return {
        name: city.name,
        iataCode: city.iataCode,
        latitude: city.geoCode.latitude,
        longitude: city.geoCode.longitude,
        population: city.population || "Not available",
        timeZone: city.timeZone || "Not available",
        country: city.address.countryName,
      };
    } else {
      throw new Error(`City "${cityName}" not found`);
    }
  } catch (error) {
    console.error(
      "Error fetching city details:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch city details.");
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { keyword } = req.query;

    if (!keyword) {
      return res
        .status(400)
        .json({ error: "Keyword is required to search city details." });
    }

    try {
      if (!token) {
        await getAccessToken();
      }

      const cityDetails = await getCityDetails(keyword);

      res.status(200).json(cityDetails);
    } catch (error) {
      console.error("Error:", error.message);
      res
        .status(500)
        .json({ error: error.message || "Failed to fetch city details." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
