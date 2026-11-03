(function () {
  // Stop if the page has no map or Leaflet failed to load
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined") return;

  // Store details used for the markers and popups
  const stores = [
    {
      key: "melville",
      name: "Thornwood Bakery Melville",
      address: "7th Street, Melville, Johannesburg, 2092",
      phone: "011 555 1234",
      tel: "+27115551234",
      lat: -26.1772,
      lng: 28.0078
    },
    {
      key: "greenside",
      name: "Thornwood Bakery Greenside",
      address: "Greenway Road, Greenside, Johannesburg, 2193",
      phone: "011 555 9876",
      tel: "+27115559876",
      lat: -26.1388,
      lng: 28.0137
    }
  ];

  // Create the map. Scroll wheel zoom is off so the page can still scroll past it
  const map = L.map(mapEl, { scrollWheelZoom: false }).setView([-26.158, 28.0107], 12);

  // OpenStreetMap tiles. The attribution is required by the OpenStreetMap licence
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Popups are built with DOM methods and textContent for safety
  function buildPopup(store) {
    const wrap = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = store.name;
    const address = document.createElement("p");
    address.textContent = store.address;
    const phone = document.createElement("a");
    phone.href = "tel:" + store.tel;
    phone.textContent = store.phone;
    wrap.appendChild(title);
    wrap.appendChild(address);
    wrap.appendChild(phone);
    return wrap;
  }

  // Add a marker for each store and remember it by key so the buttons can find it
  const markers = {};

  stores.forEach(function (store) {
    const marker = L.marker([store.lat, store.lng], { title: store.name, alt: store.name }).addTo(map);
    marker.bindPopup(buildPopup(store));
    markers[store.key] = { marker: marker, store: store };
  });

  // Zoom the map so both stores are visible
  map.fitBounds(
    stores.map(function (store) {
      return [store.lat, store.lng];
    }),
    { padding: [60, 60] }
  );

  // The Show on map buttons fly to the chosen store and open its popup
  document.querySelectorAll("[data-location]").forEach(function (button) {
    button.addEventListener("click", function () {
      const entry = markers[button.dataset.location];
      if (!entry) return;
      mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
      map.flyTo([entry.store.lat, entry.store.lng], 16, { duration: 1.2 });
      entry.marker.openPopup();
    });
  });

  // Scroll wheel zoom is only enabled while the map has focus
  map.on("focus", function () {
    map.scrollWheelZoom.enable();
  });
  map.on("blur", function () {
    map.scrollWheelZoom.disable();
  });
})();
