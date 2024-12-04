# City-Chase - [https://city-chase-rho.vercel.app/]

<img src="./xxxxxxx" alt="Screenshot of City-Chase" width="500"/>

City-Chase is a web application developed with Next.js and integrated with SQLite (via TypeORM). It enables users to explore city details, save favorite cities, and enjoy a personalized experience. With seamless navigation, a visually appealing interface, and robust features like authentication and geolocation, City-Chase aims to provide an engaging way to explore destinations around the world.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Future Development](#future-development)

## About the Project

City-Chase is designed to provide users with a comprehensive platform for discovering city details, managing favorites, and accessing city-specific information interactively.

- Dynamic City Data: City details are dynamically fetched through API routes, powered by Google Places and Google Maps APIs.
- Personalized Experience: Authenticated users can save cities to their favorites for quick access.
- Favorites Management: Manage and revisit your favorite cities in a dedicated favorites section.

## Features

- **Search Cities**: Use the Google Places Autocomplete API to search for cities worldwide.
- **View City Details**: Access detailed city information, including:
<<<<<<< HEAD
- - Name, Country
- - Latitude, Longitude
- - Population, Time Zone
=======
-  -  Name, Country
-  -  Latitude, Longitude
-  -  Population, Time Zone
>>>>>>> 1a1f7351eb923618004f58a55c5fa73eadccff9b
- **Interactive Map**: View city locations interactively using Google Maps.
- **Add to Favorites**: Save cities to your favorites for quick access.
- **Authentication**: User registration and login functionality to ensure a personalized experience.
- **Responsive Design**: Optimized for both mobile and desktop, providing a seamless experience across all devices.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/alyersin/City-Chase.git
   cd City-Chase
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:

   - Create a `.env.local` file at the project root.
   - Add your Google API key and JWT secret:

   ```plaintext
   GOOGLE_API_KEY=your_google_api_key
   JWT_SECRET=your_secret_key

   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```

## Usage

1. Start the application with `npm run dev`.
2. Go to `http://localhost:3000` to access the app locally.
3. Browse products, add them to favorites, and customize your shopping preferences.
4. Register or log in to save preferences and access your favorite items.

## Technologies Used

- **Next.js**: For the React framework and server-side rendering.
- **SQLite (via TypeORM)**: For data storage and retrieval of user and favorite data.
- **Chakra UI**: For styled, responsive UI components.
- **Google Places API**: For autocomplete city search.
- **Google Maps API**: For interactive map integration.
- **JSON Web Tokens (JWT)**: For handling authentication and authorization.

## Future Development

Some potential future features include:

- **Enhanced Authentication**: Add OAuth providers (e.g., Google, Facebook) for easier login.
- **Detailed Analytics**: Track user preferences and popular products based on user interactions.
- **Product Recommendations**: Suggest similar or popular products based on user favorites.
- **Social Sharing**: Allow users to share their favorite products with friends.
- **In-App Messaging**: Enable real-time chat or messaging for users exploring similar products.
