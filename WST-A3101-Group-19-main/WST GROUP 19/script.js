document.addEventListener("DOMContentLoaded", function () {
  const detailWrapper = document.getElementById("propertyDetailWrapper");
  const viewButtons = document.querySelectorAll(".view-details-btn");
  const backBtn = document.getElementById("backToResultsBtn");

  // Detailed specifications data matching Figma
  const propertySpecs = {
    "dragon-tower": {
      description: "A studio-type rental unit located in Quezon City, suitable for individuals looking for a convenient living space with access to essential amenities and transportation.",
      price: "₱35,000.00",
      bedroom: "Studio",
      bathroom: "1",
      kitchen: "Fully equipped",
      parking: "Available",
      aircon: "Available",
      wifi: "Available",
      furnished: "No",
      commute: "4km from work",
      establishments: "Laundry Shop, Mini Mart, Cafe, Convenience Shop",
      agentName: "Juan Dela Cruz",
      agentEmail: "dragontower@email.com",
      agentPhone: "0912-345-6789",
      viewing: "Yes, by appointment"
    },
    "likas-pinas": {
      description: "Cozy and affordable studio unit situated in Quezon City, offering a comfortable atmosphere with immediate proximity to business centers and transit.",
      price: "₱20,000.00",
      bedroom: "Studio",
      bathroom: "1",
      kitchen: "Basic kitchenette",
      parking: "Available",
      aircon: "Available",
      wifi: "Available",
      furnished: "Semi-furnished",
      commute: "2.3km from work",
      establishments: "Laundry Shop, Grocery, Cafe",
      agentName: "Maria Santos",
      agentEmail: "likaspinas@email.com",
      agentPhone: "0998-765-4321",
      viewing: "Yes, daily 9AM - 5PM"
    },
    "greenview-building": {
      description: "Modern high-rise residential unit with city views and access to fitness centers and community recreational facilities.",
      price: "₱27,000.00",
      bedroom: "Studio",
      bathroom: "1",
      kitchen: "Modern modular",
      parking: "Available",
      aircon: "Available",
      wifi: "Available",
      furnished: "Yes",
      commute: "3.2km from work",
      establishments: "Gym, Pool, Supermarket",
      agentName: "Alex Rivera",
      agentEmail: "greenview@email.com",
      agentPhone: "0917-111-2233",
      viewing: "Yes, weekends only"
    }
  };

  viewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const card = button.closest(".property-card");
      if (!card || !detailWrapper) return;

      const propId = card.getAttribute("data-property-id");
      const detailCompareBtn = detailWrapper.querySelector(
          ".add-compare-btn"
        );

        if (detailCompareBtn) {
          detailCompareBtn.dataset.propertyId = propId;
        }

      const nameEl = card.querySelector(".property-card__name");
      const locationEl = card.querySelector(".property-card__location");
      const imgEl = card.querySelector(".property-card__photo");
      const priceEl = card.querySelector('[data-field="price"]');
      const sizeEl = card.querySelector('[data-field="floorSize"]');
      const typeEl = card.querySelector('[data-field="listingType"]');
      const bedEl = card.querySelector('[data-field="bedrooms"]');

      // Top card items
      const detailName = detailWrapper.querySelector('[data-field="name"]');
      const detailLoc = detailWrapper.querySelector('[data-field="location"]');
      const detailImg = detailWrapper.querySelector('[data-field="photo"]');
      const detailPrice = detailWrapper.querySelector('[data-field="price"]');
      const detailSize = detailWrapper.querySelector('[data-field="floorSize"]');
      const detailType = detailWrapper.querySelector('[data-field="listingType"]');
      const detailBed = detailWrapper.querySelector('[data-field="bedrooms"]');

      if (detailName && nameEl) detailName.textContent = nameEl.textContent.replace("Property Name:", "").trim();
      if (detailLoc && locationEl) detailLoc.textContent = locationEl.textContent.trim();
      if (detailImg && imgEl) detailImg.src = imgEl.src;
      if (detailPrice && priceEl) detailPrice.textContent = priceEl.textContent.trim();
      if (detailSize && sizeEl) detailSize.textContent = sizeEl.textContent.trim();
      if (detailType && typeEl) detailType.textContent = typeEl.textContent.trim();
      if (detailBed && bedEl) detailBed.textContent = bedEl.textContent.trim();

      // Lower specs list
      const specs = propertySpecs[propId];
      
      if (specs) {
        
        const setField = (field, val) => {
          const el = detailWrapper.querySelector(`[data-field="${field}"]`);
          
          if (el) el.textContent = val;
        };

        setField("description", specs.description);
        setField("featurePrice", specs.price);
        setField("featureBedroom", specs.bedroom);
        setField("featureBathroom", specs.bathroom);
        setField("featureKitchen", specs.kitchen);
        setField("featureParking", specs.parking);
        setField("featureAircon", specs.aircon);
        setField("featureWifi", specs.wifi);
        setField("featureFurnished", specs.furnished);
        setField("distanceFromWork", specs.commute);
        setField("indoorEstablishment", specs.establishments);
        setField("agentName", specs.agentName);
        setField("agentEmail", specs.agentEmail);
        setField("agentPhone", specs.agentPhone);
        setField("viewingAvailable", specs.viewing);
        setField("viewingSchedule", specs.viewing);
      }

      detailWrapper.classList.remove("is-hidden");
      detailWrapper.scrollIntoView({ behavior: "smooth" });
    });
  });


  // 1. HOMEPAGE SEARCH
  const heroSearchForm = document.getElementById("heroSearchForm");

  if (heroSearchForm) {
    heroSearchForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const location = document
        .getElementById("heroLocationInput")
        .value.trim();

      const priceRange = document
        .getElementById("heroPriceRangeSelect")
        .value;

      const propertyType = document
        .getElementById("heroPropertyTypeSelect")
        .value;

      const params = new URLSearchParams({
        location,
        priceRange,
        propertyType
      });

      window.location.href = `properties.html?${params.toString()}`;
    });
  }


  // 2. PROPERTY SEARCH AND FILTERING
  const propertyCards = Array.from(
    document.querySelectorAll(".property-card[data-property-id]")
  );

  function applyPropertyFilters() {
    const locationInput = document.getElementById("locationInput");
    const typeSelect = document.getElementById("propertyTypeSelect");
    const priceSelect = document.getElementById("heroPriceRangeSelect");

    const location = locationInput
      ? locationInput.value.trim().toLowerCase()
      : "";

    const propertyType = typeSelect ? typeSelect.value.toLowerCase() : "";
    const priceRange = priceSelect ? priceSelect.value : "";

    let visibleCount = 0;

    propertyCards.forEach(function (card) {
      const cardLocation =
        card.querySelector(".property-card__location")?.textContent
          .toLowerCase() || "";

      const cardName =
        card.querySelector(".property-card__name")?.textContent
          .toLowerCase() || "";

      const priceText =
        card.querySelector('[data-field="price"]')?.textContent || "";

      const price = Number(priceText.replace(/[^\d.]/g, ""));

      const cardType =
        card.dataset.propertyType?.toLowerCase() || "";

      const matchesLocation =
        !location ||
        cardLocation.includes(location) ||
        cardName.includes(location);

      const matchesType =
        !propertyType || cardType === propertyType;

      let matchesPrice = true;

      if (priceRange === "0-15000") {
        matchesPrice = price <= 15000;
      } else if (priceRange === "15000-30000") {
        matchesPrice = price > 15000 && price <= 30000;
      } else if (priceRange === "30000-50000") {
        matchesPrice = price > 30000 && price <= 50000;
      } else if (priceRange === "50000+") {
        matchesPrice = price > 50000;
      }

      const showCard =
        matchesLocation && matchesType && matchesPrice;

      card.hidden = !showCard;

      if (showCard) visibleCount++;
    });

    let message = document.getElementById("searchResultsMessage");

    if (!message && propertyCards.length > 0) {
      message = document.createElement("p");
      message.id = "searchResultsMessage";
      message.setAttribute("role", "status");
      propertyCards[0].parentElement.before(message);
    }

    if (message) {
      message.textContent =
        `${visibleCount} matching propert${visibleCount === 1 ? "y" : "ies"} found.`;
    }
  }

  // Read filters passed from the homepage.
  const queryParams = new URLSearchParams(window.location.search);

  const locationInput = document.getElementById("locationInput");
  const propertyTypeSelect = document.getElementById("propertyTypeSelect");

  if (locationInput && queryParams.has("location")) {
    locationInput.value = queryParams.get("location");
  }

  if (propertyTypeSelect && queryParams.has("propertyType")) {
    propertyTypeSelect.value = queryParams.get("propertyType");
  }

  // Apply the homepage price filter only if a matching select exists
  // on the Properties page.
  if (queryParams.has("priceRange")) {
    const priceSelect = document.getElementById("heroPriceRangeSelect");

    if (priceSelect) {
      priceSelect.value = queryParams.get("priceRange");
    }
  }

  const preferencesForm = document.getElementById("preferencesForm");

  if (preferencesForm) {
    preferencesForm.addEventListener("submit", function (event) {
      event.preventDefault();
      applyPropertyFilters();
    });
  }

  // If the page was opened with search filters, apply them immediately.
  if (propertyCards.length > 0 && window.location.search) {
    applyPropertyFilters();
  }


  // 3. SELECT PROPERTIES TO COMPARE
  let selectedProperties = [];

  try {
    selectedProperties = JSON.parse(
      localStorage.getItem("homeChoiceSelectedProperties") || "[]"
    );
  } catch (error) {
    selectedProperties = [];
  }

  function updateCompareButtons() {
    document.querySelectorAll(".add-compare-btn").forEach(function (button) {
      const id = button.dataset.propertyId;
      const isSelected = id && selectedProperties.includes(id);

      button.textContent = isSelected
        ? "Remove from compare"
        : "Add to compare";
    });
  }

  document.addEventListener("click", function (event) {
    const button = event.target.closest(".add-compare-btn");

    if (!button) return;

    const card = button.closest(".property-card");

    // Use the property card's ID if the button doesn't have one.
    const id = button.dataset.propertyId ||
      (card && card.dataset.propertyId);

    if (!id) {
      alert("Property ID is missing. Check the property's HTML.");
      return;
    }

    // Keep the button's ID synchronized.
    button.dataset.propertyId = id;

    if (selectedProperties.includes(id)) {
      selectedProperties = selectedProperties.filter(
        selectedId => selectedId !== id
      );
    } else {
      if (selectedProperties.length >= 2) {
        alert("You can compare only two properties at a time.");
        return;
      }

      selectedProperties.push(id);
    }

    localStorage.setItem(
      "homeChoiceSelectedProperties",
      JSON.stringify(selectedProperties)
    );

    updateCompareButtons();

    if (selectedProperties.length === 2) {
      if (confirm("Two properties selected. Open the comparison page now?")) {
        window.location.href = "Comparison.html";
      }
    }
  });

  updateCompareButtons();


  // 4. SAVE THE COMPARISON
  const saveComparisonBtn = document.getElementById("saveComparisonBtn");

  if (saveComparisonBtn) {
    saveComparisonBtn.addEventListener("click", async function () {
      const firstId = document.getElementById(
        "comparisonProperty1Name"
      )?.dataset.propertyId;

      const secondId = document.getElementById(
        "comparisonProperty2Name"
      )?.dataset.propertyId;

      if (!firstId || !secondId || firstId === secondId) {
        alert("Please select two different properties to compare.");
        return;
      }

      try {
        const response = await fetch("/api/comparisons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            propertyIds: [firstId, secondId]
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Unable to save comparison.");
        }

        alert("Comparison saved successfully on the server.");
      } catch (error) {
        console.error("Save comparison error:", error);
        alert("Could not save. Check that the HomeChoice server is running.");
      }
    });
  }

  // 5. SWAP THE TWO COMPARISON COLUMNS
  const swapComparisonBtn = document.getElementById("swapComparisonBtn");

  if (swapComparisonBtn) {
    swapComparisonBtn.addEventListener("click", function () {
      const table = document.getElementById("comparisonTable");

      if (!table) return;

      const firstHeading = document.getElementById("comparisonProperty1Name");
      const secondHeading = document.getElementById("comparisonProperty2Name");

      if (!firstHeading || !secondHeading) return;

      // Swap the property names and IDs in the column headings.
      const firstName = firstHeading.textContent;
      firstHeading.textContent = secondHeading.textContent;
      secondHeading.textContent = firstName;

      const firstId = firstHeading.dataset.propertyId;
      firstHeading.dataset.propertyId = secondHeading.dataset.propertyId;
      secondHeading.dataset.propertyId = firstId;

      // Swap each pair of cells in the table.
      table.querySelectorAll("tbody tr").forEach(function (row) {
        const firstCell = row.querySelector('[data-property="1"]');
        const secondCell = row.querySelector('[data-property="2"]');

        if (firstCell && secondCell) {
          const firstValue = firstCell.textContent;
          firstCell.textContent = secondCell.textContent;
          secondCell.textContent = firstValue;
        }
      });
    });
  }


  // 6. DEMO LOGIN / REGISTER BUTTON
  const loginRegisterBtn = document.getElementById("loginRegisterBtn");

  if (loginRegisterBtn) {
    loginRegisterBtn.addEventListener("click", function () {
      alert(
        "Login / Register will be available when the authentication feature is implemented."
      );
    });
  }

  
  // 7. LOAD COMPARISON DATA FROM BACKEND
  async function loadComparisonFromBackend() {
    const table = document.getElementById("comparisonTable");

    if (!table) return;

    try {
      const response = await fetch("/api/properties");

      if (!response.ok) {
        throw new Error("Could not retrieve properties.");
      }

      const properties = await response.json();

      const firstHeading = document.getElementById(
        "comparisonProperty1Name"
      );

      const secondHeading = document.getElementById(
        "comparisonProperty2Name"
      );

      const selectedIds = JSON.parse(
        localStorage.getItem("homeChoiceSelectedProperties") || "[]"
      );

      // Use selected properties when two have been chosen.
      // Otherwise, keep the two IDs already in the HTML.
      const firstId = selectedIds.length === 2
        ? selectedIds[0]
        : firstHeading.dataset.propertyId;

      const secondId = selectedIds.length === 2
        ? selectedIds[1]
        : secondHeading.dataset.propertyId;

      const first = properties.find(property => property.id === firstId);
      const second = properties.find(property => property.id === secondId);

      if (!first || !second) {
        throw new Error("One or both properties could not be found.");
      }

      firstHeading.textContent = first.name;
      firstHeading.dataset.propertyId = first.id;

      secondHeading.textContent = second.name;
      secondHeading.dataset.propertyId = second.id;

      const featureValues = {
        monthlyRent: property => `₱${property.price.toLocaleString("en-PH", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`,
        location: property => property.location,
        lotFloorSize: property => `${property.size} sqm`,
        propertyType: property => property.type,
        bedrooms: property => property.bedrooms,
        bathrooms: property => String(property.bathrooms),
        amenities: property => property.amenities.join(", "),
        distanceToWork: property => `${property.distanceToWork} km`,
        overallScore: property => `${property.score}%`
      };

      table.querySelectorAll("tbody tr[data-feature]").forEach(row => {
        const feature = row.dataset.feature;
        const formatter = featureValues[feature];

        if (!formatter) return;

        const firstCell = row.querySelector('[data-property="1"]');
        const secondCell = row.querySelector('[data-property="2"]');

        if (firstCell) firstCell.textContent = formatter(first);
        if (secondCell) secondCell.textContent = formatter(second);
      });

      const bestMatch = first.score >= second.score ? first : second;
      const bestMatchName = document.getElementById("bestMatchName");

      if (bestMatchName) {
        bestMatchName.textContent = bestMatch.name;
      }

      const banner = document.getElementById("bestMatchBanner");

      if (banner) {
        banner.dataset.propertyId = bestMatch.id;
      }
    } catch (error) {
      console.error("Unable to load comparison:", error);
    }
  }
  
  loadComparisonFromBackend();

  if (backBtn && detailWrapper) {
    backBtn.addEventListener("click", function () {
      detailWrapper.classList.add("is-hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  
/* Saved Comparisons */

const viewSavedComparisonsBtn = document.getElementById(
    "viewSavedComparisonsBtn"
);

const savedComparisonsContent = document.getElementById(
    "savedComparisonsContent"
);

const savedComparisonsStatus = document.getElementById(
    "savedComparisonsStatus"
);

const savedComparisonsList = document.getElementById(
    "savedComparisonsList"
);

if (
    viewSavedComparisonsBtn &&
    savedComparisonsContent &&
    savedComparisonsStatus &&
    savedComparisonsList
) {
    viewSavedComparisonsBtn.addEventListener("click", async () => {
        const isHidden = savedComparisonsContent.classList.contains(
            "is-hidden"
        );

        if (!isHidden) {
            savedComparisonsContent.classList.add("is-hidden");
            viewSavedComparisonsBtn.setAttribute("aria-expanded", "false");
            viewSavedComparisonsBtn.textContent = "View Saved Comparisons";
            return;
        }

        savedComparisonsContent.classList.remove("is-hidden");
        viewSavedComparisonsBtn.setAttribute("aria-expanded", "true");
        viewSavedComparisonsBtn.textContent = "Hide Saved Comparisons";

        await loadSavedComparisons();
    });
}

async function loadSavedComparisons() {
    savedComparisonsStatus.textContent = "Loading saved comparisons...";
    savedComparisonsList.replaceChildren();

    try {
        const response = await fetch("/api/comparisons");

        if (!response.ok) {
            throw new Error("Unable to retrieve saved comparisons.");
        }

        const comparisons = await response.json();

        if (!Array.isArray(comparisons)) {
            throw new Error("The server returned an invalid response.");
        }

        if (comparisons.length === 0) {
            savedComparisonsStatus.textContent =
                "No comparisons saved yet. Compare two properties and select Save to get started.";
            return;
        }

        savedComparisonsStatus.textContent =
            `${comparisons.length} saved comparison` +
            (comparisons.length === 1 ? "" : "s") + ".";

        comparisons.slice().reverse().forEach((comparison) => {
            const properties = Array.isArray(comparison.properties)
                ? comparison.properties
                : [];

            const firstProperty = properties[0];
            const secondProperty = properties[1];

            const item = document.createElement("article");
            item.className = "saved-comparison-item";

            const details = document.createElement("div");
            details.className = "saved-comparison-item__details";

            const title = document.createElement("h3");
            title.className = "saved-comparison-item__title";
            title.textContent =
                `${firstProperty?.name || "Unknown property"} vs. ` +
                `${secondProperty?.name || "Unknown property"}`;

            const date = document.createElement("p");
            date.className = "saved-comparison-item__date";

            const savedDate = comparison.savedAt
                ? new Date(comparison.savedAt)
                : null;

            date.textContent =
                savedDate && !Number.isNaN(savedDate.getTime())
                    ? `Saved on: ${savedDate.toLocaleString()}`
                    : "Saved date unavailable";

            const openButton = document.createElement("button");
            openButton.type = "button";
            openButton.className = "saved-comparison-item__button";
            openButton.textContent = "View Comparison";

            openButton.addEventListener("click", () => {
                if (!firstProperty?.id || !secondProperty?.id) {
                    alert("This saved comparison has incomplete property data.");
                    return;
                }

                localStorage.setItem(
                    "homeChoiceSelectedProperties",
                    JSON.stringify([
                        firstProperty.id,
                        secondProperty.id
                    ])
                );

                window.location.reload();
                window.scrollTo(0, 0);
            });

            details.append(title, date);
            item.append(details, openButton);
            savedComparisonsList.appendChild(item);
        });
    } catch (error) {
        console.error("Error loading saved comparisons:", error);

        savedComparisonsStatus.textContent =
            "Could not load saved comparisons. Please check that the server is running and try again.";

        const retryButton = document.createElement("button");
        retryButton.type = "button";
        retryButton.className = "btn-outline";
        retryButton.textContent = "Try Again";

        retryButton.addEventListener("click", loadSavedComparisons);

        savedComparisonsList.appendChild(retryButton);
    }
}

});
