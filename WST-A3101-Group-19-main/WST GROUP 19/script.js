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

  if (backBtn && detailWrapper) {
    backBtn.addEventListener("click", function () {
      detailWrapper.classList.add("is-hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // --- Property Selection & Comparison Bar Logic ---
  let selectedSlots = {
    slot1: null,
    slot2: null
  };

  const propertyNames = {
    "dragon-tower": "Dragon Tower",
    "likas-pinas": "Likas Pinas",
    "greenview-building": "GreenView Building"
  };

  const addCompareButtons = document.querySelectorAll(".add-compare-btn");
  const slot1Btn = document.getElementById("selectFirstPropertyBtn");
  const slot2Btn = document.getElementById("selectSecondPropertyBtn");
  const swapBtn = document.getElementById("swapPropertiesBtn");

  addCompareButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const propId = button.getAttribute("data-property-id");
      const displayName = propertyNames[propId] || propId;

      if (!selectedSlots.slot1) {
        selectedSlots.slot1 = propId;
        if (slot1Btn) {
          slot1Btn.innerHTML = `${displayName} <span aria-hidden="true">✓</span>`;
          slot1Btn.classList.add("is-selected");
        }
      } else if (!selectedSlots.slot2) {
        if (selectedSlots.slot1 === propId) {
          alert("This property is already selected in Slot 1!");
          return;
        }
        selectedSlots.slot2 = propId;
        if (slot2Btn) {
          slot2Btn.innerHTML = `${displayName} <span aria-hidden="true">✓</span>`;
          slot2Btn.classList.add("is-selected");
        }
      } else {
        selectedSlots.slot2 = propId;
        if (slot2Btn) {
          slot2Btn.innerHTML = `${displayName} <span aria-hidden="true">✓</span>`;
        }
      }
    });
  });

  if (swapBtn) {
    swapBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "Comparison.html";
    });
  }

  const saveBtn = document.getElementById("saveComparisonBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Comparison saved to your shortlisted properties!");
    });
  }
});