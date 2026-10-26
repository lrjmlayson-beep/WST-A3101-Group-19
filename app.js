const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Frontend folder
const publicDir = path.join(__dirname, "WST GROUP 19");

// 2. Middleware, register before the routes
app.use(express.json());
app.use(express.static(publicDir));

// 3. Persistent storage for saved comparisons
const dataFolder = path.join(__dirname, "data");
const savedFile = path.join(dataFolder, "comparisons.json");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder, { recursive: true });
}

if (!fs.existsSync(savedFile)) {
  fs.writeFileSync(savedFile, "[]", "utf8");
}

// 4. Property catalogue
const properties = [
  {
    id: "dragon-tower",
    name: "Dragon Tower",
    price: 35000,
    location: "Quezon City, Metro Manila",
    size: 40,
    type: "Studio type",
    bedrooms: "Studio",
    bathrooms: 1,
    amenities: ["Pool", "Gym", "Parking"],
    distanceToWork: 4,
    score: 64
  },
  {
    id: "likas-pinas",
    name: "Likas Pinas",
    price: 20000,
    location: "Quezon City, Metro Manila",
    size: 35,
    type: "Studio type",
    bedrooms: "Studio",
    bathrooms: 1,
    amenities: ["Pool", "Gym", "Parking", "Laundry Shop"],
    distanceToWork: 2.2,
    score: 82
  },
  {
    id: "greenview-building",
    name: "Greenview Building",
    price: 27000,
    location: "Quezon City, Metro Manila",
    size: 30,
    type: "Studio type",
    bedrooms: "Studio",
    bathrooms: 1,
    amenities: ["Gym", "Pool", "Supermarket"],
    distanceToWork: 3.2,
    score: 72
  }
];

// 5. Read and write saved comparisons
function readComparisons() {
  try {
    return JSON.parse(fs.readFileSync(savedFile, "utf8"));
  } catch (error) {
    console.error("Error reading comparisons:", error);
    return [];
  }
}

function writeComparisons(comparisons) {
  fs.writeFileSync(
    savedFile,
    JSON.stringify(comparisons, null, 2),
    "utf8"
  );
}

// 6. Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// 7. Get all properties
app.get("/api/properties", (req, res) => {
  res.json(properties);
});

// 8. Get one property by ID
app.get("/api/properties/:id", (req, res) => {
  const property = properties.find(
    item => item.id === req.params.id
  );

  if (!property) {
    return res.status(404).json({
      message: "Property not found."
    });
  }

  res.json(property);
});

// 9. Save a comparison
app.post("/api/comparisons", (req, res) => {
  const { propertyIds } = req.body || {};

  if (
    !Array.isArray(propertyIds) ||
    propertyIds.length !== 2 ||
    propertyIds[0] === propertyIds[1]
  ) {
    return res.status(400).json({
      message: "Please provide two different property IDs."
    });
  }

  const selectedProperties = propertyIds.map(id =>
    properties.find(property => property.id === id)
  );

  if (selectedProperties.some(property => !property)) {
    return res.status(400).json({
      message: "One or more property IDs are invalid."
    });
  }

  const comparisons = readComparisons();

  const savedComparison = {
    id: Date.now().toString(),
    savedAt: new Date().toISOString(),
    properties: selectedProperties
  };

  comparisons.push(savedComparison);
  writeComparisons(comparisons);

  res.status(201).json({
    message: "Comparison saved successfully.",
    comparison: savedComparison
  });
});

// 10. Get all saved comparisons
app.get("/api/comparisons", (req, res) => {
  res.json(readComparisons());
});

// 11. Start the server ONCE, at the end
app.listen(PORT, () => {
  console.log(`HomeChoice server running at http://localhost:${PORT}`);
});
