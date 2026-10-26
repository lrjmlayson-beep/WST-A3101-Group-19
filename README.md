# Home Choice

## About the Project
Home Choice is a web application that helps users find, view, and compare properties based on their preferences, budget, and location. It aims to make choosing a suitable property easier and more convenient.

## Features
- **Property Search:** Search for properties based on location, price range, and property type.
- **Property Listings:** Browse available properties and view their details.
- **Property Comparison:** Select and compare up to two properties at a time.
- **Best Match:** View a suggested match based on the property's score.
- **Save Comparison:** Save property comparisons using the backend.
- **Responsive Design:** Use the website on different screen sizes.

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- JSON for data storage

## Project Files
- `index.html` – Main page of the application.
- `properties.html` – Displays property listings and search filters.
- `Comparison.html` – Displays the property comparison page.
- `PropertyDetails.html` – Property details page, if used in the current version.
- `script.js` – Handles website interactions and functionality.
- `style.css` – Contains the website's styling.
- `app.js` – Runs the Node.js and Express backend and provides API endpoints.
- `data/comparisons.json` – Stores saved comparisons, if configured in the backend.
- `package.json` – Contains project information and dependencies.

## How to Run the Project
1. Install [Node.js](https://nodejs.org/).
2. Open the project folder in Visual Studio Code.
3. Open the terminal and install the dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   node app.js
   ```

5. Open `http://localhost:3000` in your browser.

## API Endpoints
The backend provides the following endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/properties` | Retrieves all properties. |
| GET | `/api/properties/:id` | Retrieves a specific property. |
| POST | `/api/comparisons` | Saves a comparison between two properties. |
| GET | `/api/comparisons` | Retrieves saved comparisons. |

## Limitations
- The property listings are sample data.
- The best-match score is based on a simple scoring system.
- Login and registration may be placeholders.
- JSON file storage is intended for this project prototype and is not suitable for all production needs.

## Project Documentation
- [AI Use Documentation](https://docs.google.com/document/d/1KWIyuXTdqOlOQLyzCFduNdtPUae2AsdPb-0_5N4H4ZI/edit?usp=sharing)
- [Application Workflow](https://docs.google.com/spreadsheets/d/1I6dl3kYJpOhzzUmd8_BCs3EehMsE1GMB4oPFnXwPd6A/edit?usp=sharing)
