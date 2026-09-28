# HOME CHOICE

## Web Application Overview

**Home Choice** is a browser-based property sourcing and comparison application designed to help users find and evaluate rental properties based on their personal preferences and lifestyle needs.

The application focuses on making property searching easier by allowing users to:

* Search properties based on location, price range, and property type
* Set property preferences such as size, financing, bedrooms, and listing type
* Adjust the importance of factors such as rent, location, size, amenities, and commute
* View matching properties
* View detailed information about individual properties
* Compare selected properties
* Review property features, location information, and agent contact details

The interface is designed primarily for **individuals looking for a rental property**, particularly users who want to compare several options before making a decision.

---

# Files and Their Functions

## 1. `index.html` — Home Page

The `index.html` file serves as the **main landing page** of Home Choice.

### Main sections

| Section            | Purpose                                                        |
| ------------------ | -------------------------------------------------------------- |
| Header             | Provides the Home Choice branding and navigation               |
| Navigation         | Links to Agents, Properties, About Us, and Login/Register      |
| Hero Section       | Introduces the application's main purpose                      |
| Search Form        | Allows users to enter location, price range, and property type |
| Introduction       | Explains the purpose of Home Choice                            |
| Value Propositions | Highlights the benefits of using the application               |
| How It Works       | Explains the three-step property matching process              |
| Footer             | Provides additional navigation links                           |

### Search options

The homepage search interface includes:

* **Location**
* **Price Range**

  * ₱0 – ₱15,000
  * ₱15,000 – ₱30,000
  * ₱30,000 – ₱50,000
  * ₱50,000+
* **Property Type**

  * Condo
  * Apartment
  * House
  * Studio

The page communicates the application's goal of helping users identify properties according to their lifestyle and priorities.

---

## 2. `properties.html` — Property Matching and Details

The `properties.html` file is the main **property matching page**.

It allows users to specify detailed preferences and browse matching properties. The page contains a preference form, importance sliders, property cards, and a dynamic property-details section.

### Preference fields

Users can specify:

* Location
* Property Type
* Lot Size
* Price Range
* Available Financing
* Floor Size
* Work Address
* Listing Type
* Number of Bedrooms

These inputs allow the application to organize the information users consider when choosing a property.

### Importance Factors

Users can adjust the importance of:

* **Rent**
* **Location**
* **Size**
* **Amenities**
* **Commute**

Each factor uses a percentage slider from **0% to 100%**, allowing users to indicate which criteria matter more to them.

### Matching Properties

The page displays property cards containing:

* Property photo
* Property name
* Location
* Price
* Floor size
* Listing type
* Bedrooms
* Distance from work
* View Details button
* Add to Compare button

The current property examples are:

1. **Dragon Tower**
2. **Likas Pinas**
3. **GreenView Building**

The property cards are structured using reusable HTML classes and `data-property-id` attributes so JavaScript can identify the selected property.

### Property Details

A hidden property-details section is included on the same page. When a user selects **View Details**, the relevant property information can be displayed without leaving the page.

The details include:

* Property description
* Price
* Bedroom
* Bathroom
* Kitchen
* Parking
* Air conditioning
* Wi-Fi
* Furnishing
* Distance from work
* Nearby establishments
* Agent name
* Email
* Contact number
* Viewing availability
* Viewing schedule

---

## 3. `comparison.html` — Property Comparison

The `comparison.html` file provides a **side-by-side comparison** of selected properties.

The page includes:

* Properties Comparison heading
* Save button
* Best Match section
* User priority percentages
* Comparison table

### Comparison information

Properties are compared using:

| Feature          | Description                  |
| ---------------- | ---------------------------- |
| Monthly Rent     | Monthly rental cost          |
| Location         | Property location            |
| Lot/Floor Size   | Available property size      |
| Property Type    | Type of property             |
| Bedrooms         | Number/type of bedrooms      |
| Bathrooms        | Number of bathrooms          |
| Amenities        | Available facilities         |
| Distance to Work | Approximate commute distance |
| Overall Score    | Property matching score      |

The current comparison example includes **Dragon Tower** and **Likas Pinas**.

The page also displays a **Best Match** banner and the importance percentages for rent, location, size, amenities, and commute.

---

## 4. `Property Details.html`

`Property Details.html` contains the same comparison-oriented structure shown in the supplied code, including the Home Choice header, comparison panel, Best Match section, and comparison table.

---

## 5. `script.js` — JavaScript Functionality

The `script.js` file provides the application's interactive property-detail functionality.

### Property data

The script stores detailed information for:

* `dragon-tower`
* `likas-pinas`
* `greenview-building`

Each property contains information such as:

* Description
* Price
* Bedroom
* Bathroom
* Kitchen
* Parking
* Air conditioning
* Wi-Fi
* Furnishing
* Commute distance
* Nearby establishments
* Agent information
* Viewing schedule

### View Details functionality

When the user clicks a **View Details** button:

1. JavaScript identifies the selected property.
2. It reads the property's information from the property card.
3. It retrieves additional specifications from the `propertySpecs` object.
4. It updates the property-details section.
5. The hidden details section becomes visible.
6. The page smoothly scrolls to the property details.

### Back to Results

The **Back to results** button hides the property-details section and smoothly returns the user to the top of the results.

This provides an interactive browsing experience without requiring the user to reload or navigate to another page.

---

# 6. `style.css` — Application Styling

The `style.css` file provides the visual design and layout for the entire Home Choice application.

It uses CSS variables for consistent colors, spacing, borders, shadows, fonts, and border radius.

### Main styling components

| CSS Component         | Purpose                              |
| --------------------- | ------------------------------------ |
| `.site-header`        | Styles the main navigation header    |
| `.site-header__brand` | Styles the Home Choice branding      |
| `.site-header__nav`   | Organizes navigation links           |
| `.site-footer`        | Styles the footer                    |
| `.hero`               | Creates the homepage hero section    |
| `.hero-search`        | Styles the property search form      |
| `.preferences-grid`   | Organizes preference fields          |
| `.weights-grid`       | Organizes importance sliders         |
| `.property-card`      | Styles individual property listings  |
| `.property-detail`    | Styles detailed property information |
| `.comparison-table`   | Styles the property comparison table |
| `.best-match-banner`  | Highlights the best-match result     |
| `.step__card`         | Styles the How It Works cards        |

## The CSS also includes responsive layouts for smaller screens, including adjustments to the property preferences, importance-factor grid, steps, and property-detail columns.

# Application Workflow

The intended user flow is:

```text
HOME PAGE
    │
    ▼
Search / Start
    │
    ▼
Set Property Preferences
    │
    ▼
Set Importance Factors
    │
    ▼
View Matching Properties
    │
    ├───────────────┐
    ▼               ▼
View Details    Add to Compare
    │               │
    ▼               ▼
Property Info    Compare Properties
                    │
                    ▼
               Best Match
```

The overall concept follows the three main steps presented on the homepage:

1. **Add your properties**
2. **Set what matters**
3. **Get your ranked match**

---

## The property cards and detailed-property layout present these details in clearly labeled sections, making the information easier for users to understand and compare.

# Technologies Used

* **HTML** — webpage structure and content
* **CSS** — layout, styling, responsiveness, and visual design
* **JavaScript** — user interactions and dynamic property details
* **SVG** — interface icons
* **Local image assets** — property photos and visual elements

---

# Key Features

### Property Search

Users can search using basic criteria such as location, price range, and property type.

### Preference Setting

Users can provide more detailed property requirements, including property size, financing, listing type, and bedrooms.

### Importance Sliders

Users can assign different importance levels to rent, location, size, amenities, and commute.

### Property Matching

The application presents properties that users can review according to their preferences.

### Property Details

Users can view additional property specifications and agent information.

### Property Comparison

Users can compare multiple properties using important features such as price, location, size, amenities, commute distance, and overall score.

### Best Match

The comparison page highlights the property identified as the current best match based on the displayed priorities.

### Responsive Design

The layout includes responsive CSS rules so major sections can adapt to smaller screen sizes.

---

# Intended Users

Home Choice is intended for:

* Individuals searching for rental properties
* Students and young professionals
* Employees looking for properties near their workplace
* Renters comparing multiple property options
* Users who want to prioritize budget, location, space, amenities, and commute

---

# Summary

**Home Choice** is designed to simplify the property-search process by bringing property preferences, matching, detailed information, and comparison into one browser-based application.

Instead of requiring users to manually organize different property options, the application provides structured property information and interactive tools that help users examine their choices based on the factors that matter to them.
