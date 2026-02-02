document.addEventListener("DOMContentLoaded", () => {
    loadLocations();
    loadCategories();
    loadTransmissions();
    loadCars();
});

async function loadLocations() {
    try {
        const response = await fetch("https://localhost:5001/api/locations");
        const locations = await response.json();

        console.log("Locations:", locations);

        const container = document.getElementById("locationsCriteria");

        locations.forEach((location) => {
            const wrapper = document.createElement("div");
            wrapper.className = "form-check";

            // Create the input element
            const input = document.createElement("input");
            input.className = "form-check-input";
            input.type = "checkbox";
            input.name = "location";
            input.id = `location-${location.id}`;
            input.value = location.code;

            // 👇 Attach the change event listener
            input.addEventListener("change", (event) => {
                if (event.target.checked) {
                    console.log("Location checked: " + location.name);
                    filterChecked("location", location);
                } else {
                    console.log("Location unchecked: " + location.name);
                    filterUnchecked("location", location);
                }
            });

            // Create the label element
            const label = document.createElement("label");
            label.className = "form-check-label";
            label.htmlFor = input.id;
            label.textContent = location.name;

            // Build the structure
            wrapper.appendChild(input);
            wrapper.appendChild(label);
            container.appendChild(wrapper);
        });

    } catch (error) {
        console.error("Failed to load locations:", error);
    }
}
async function loadTransmissions() {
    try {
        const response = await fetch("https://localhost:5001/api/transmissions");
        const transmissions = await response.json();

        console.log("Transmissions:", transmissions);

        const container = document.getElementById("transmissionsCriteria");


        transmissions.forEach(transmission => {
            const wrapper = document.createElement("div");
            wrapper.className = "form-check";

            const input = document.createElement("input");
            input.className = "form-check-input";
            input.type = "checkbox";
            input.name = "transmission";
            input.id = `transmission-${transmission.id}`;
            input.value = transmission.code;
            console.log("Transmission code is " + transmission.code);

            // 👇 EVENT LISTENER HERE
            input.addEventListener("change", (event) => {
                if (event.target.checked) {
                    console.log("Checkbox is checked!");
                    filterChecked("transmission", transmission);
                } else {
                    console.log("Checkbox is unchecked!");
                    filterUnchecked("transmission", transmission);
                }

            });

            const label = document.createElement("label");
            label.className = "form-check-label";
            label.htmlFor = input.id;
            label.textContent = transmission.name;

            wrapper.appendChild(input);
            wrapper.appendChild(label);
            container.appendChild(wrapper);
        });

    } catch (error) {
        console.error("Failed to load transmissions:", error);
    }
}
async function loadCategories() {
    try {
        const response = await fetch("https://localhost:5001/api/categories");
        const categories = await response.json();

        console.log("the loadCategories is called ");
        console.log("Categories:", categories);

        const container = document.getElementById("categoryCriteria");

        categories.forEach((category) => {
            const wrapper = document.createElement("div");
            wrapper.className = "form-check";

            // Create the input element manually
            const input = document.createElement("input");
            input.className = "form-check-input";
            input.type = "checkbox";
            input.name = "category";
            input.id = `category-${category.id}`;
            input.value = category.name;

            // 👇 Added Event Listener to match loadTransmissions logic
            input.addEventListener("change", (event) => {
                if (event.target.checked) {
                    console.log("Category checked!");
                    filterChecked("category", category);
                } else {
                    console.log("Category unchecked!");
                    filterUnchecked("category", category);
                }
            });

            // Create the label element manually
            const label = document.createElement("label");
            label.className = "form-check-label";
            label.htmlFor = input.id;
            label.textContent = category.name;
            // Note: kept 'id' unique per element if needed, 
            // but IDs should generally be unique in a document.
            label.id = `label-category-${category.id}`;

            // Append elements to the wrapper
            wrapper.appendChild(input);
            wrapper.appendChild(label);

            // Append wrapper to the container
            container.appendChild(wrapper);
        });

    } catch (error) {
        console.error("Failed to load categories:", error);
    }
}

async function loadCars() {
    try {
        const response = await fetch("https://localhost:5001/api/car");
        const cars = await response.json();

        console.log("Cars:", cars);

        const container = document.getElementById("searchResultContainer");
        container.innerHTML = ""; // clear previous results

        cars.forEach(car => {
            const col = document.createElement("div");
            col.className = "col-12 mb-4"; // ONE card per row

            col.innerHTML = `
                <div class="card shadow-sm">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img 
                                src="https://localhost:5001${car.imageUrl}" 
                                class="img-fluid rounded-start"
                                alt="${car.make} ${car.model}"
                            >
                        </div>

                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${car.make} ${car.model} (${car.year})
                                </h5>

                                <p class="card-text mb-1">
                                    <strong>Category:</strong> ${car.category ?? "—"}
                                </p>

                                <p class="card-text mb-1">
                                    <strong>Transmission:</strong> ${car.transmission ?? "—"}
                                </p>

                                <p class="card-text mb-1">
                                    <strong>Price:</strong> €${Number(car.dailyPrice).toFixed(2)} / day
                                </p>
 

                            <button type="button"
                                class="btn btn-primary mt-2"
                                onclick="window.location.href='finalizeReservation.html?carId=${car.id}'">
                                Rent Now
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });

    } catch (error) {
        console.error("Failed to load cars:", error);
    }
}

// Search Filters
const activeFilters = [];

function filterChecked(filterName, filterObject) {
    // Upload filter in the active filters section
    console.log("The filter name is: " + filterObject.name);
    console.log("The filter id is " + filterObject.id);
    // load filter on the box
    let filterBox = document.getElementById("activeFilters");
    let newFilter = document.createElement("button");
    newFilter.id = "filterButton";
    newFilter.name = filterObject.name;
    newFilter.innerHTML = filterObject.name;
    filterBox.append(newFilter);
    if (filterName == "transmission") {
        console.log("Loading Transmission Filter")
    } else if (filterName == "category") {
        console.log("Loading category filter");
    } else if (filterName == "location") {
        console.log("Loading location filter");
    }

    // call the LoadFilteredList() function 
    loadFilteredList(filterName, filterObject);
}

function filterUnchecked(filterName, filterObject) {
    console.log("filterObject passed " + filterObject.name);
    // getElementsByName returns a collection (NodeList)
    let nodes = document.getElementsByName(filterObject.name);
    console.log("Nodes found: " + nodes.length);
    let filterBox = document.getElementById("activeFilters");
    // Check if the node exists and is a child of filterBox before removing
    if (nodes.length > 0) {
        // We take the first element in the collection [0]
        filterBox.removeChild(nodes[0]);
    }
    // call the LoadFilteredList() function 
    loadUnfilteredList(filterName, filterObject);
}

async function loadFilteredList(filterName, filterObject) {
    try {
        // 1️⃣ Update activeFilters array (replace existing filter of same type)
        const existingIndex = activeFilters.findIndex(
            f => f.type === filterName
        );

        if (existingIndex !== -1) {
            activeFilters[existingIndex] = {
                type: filterName,
                value: filterObject
            };
        } else {
            activeFilters.push({
                type: filterName,
                value: filterObject
            });
        }

        console.log("Active filters:", activeFilters);

        // 2️⃣ Build query params from ALL active filters
        const params = new URLSearchParams();

        activeFilters.forEach(filter => {
            if (filter.type === "category") {
                params.set("category", filter.value.name);
            }

            if (filter.type === "transmission") {
                params.set("transmission", filter.value.code ?? filter.value.name);
            }

            if (filter.type === "location") {
                params.set("location", filter.value.code ?? filter.value.name);
            }
        });

        const url = `https://localhost:5001/api/car/search?${params.toString()}`;
        console.log("Filtered API URL:", url);

        // 3️⃣ Call backend
        const response = await fetch(url);
        const cars = await response.json();

        console.log("Filtered cars:", cars);

        // 4️⃣ Render results
        const container = document.getElementById("searchResultContainer");
        container.innerHTML = "";

        cars.forEach(car => {
            const col = document.createElement("div");
            col.className = "col-12 mb-4";

            col.innerHTML = `
                <div class="card shadow-sm">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img 
                                src="https://localhost:5001${car.imageUrl}"
                                class="img-fluid rounded-start"
                                alt="${car.make} ${car.model}"
                            >
                        </div>

                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${car.make} ${car.model} (${car.year})
                                </h5>

                                <p class="card-text mb-1">
                                    <strong>Category:</strong> ${car.category ?? "—"}
                                </p>

                                <p class="card-text mb-1">
                                    <strong>Transmission:</strong> ${car.transmission ?? "—"}
                                </p>

                                <p class="card-text mb-1">
                                    <strong>Price:</strong> €${Number(car.dailyPrice).toFixed(2)} / day
                                </p>

                                <button class="btn btn-primary mt-2">
                                    Rent Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(col);
        });

    } catch (error) {
        console.error("Failed to load filtered list:", error);
    }
}

async function loadUnfilteredList(filterName, filterObject) {
    try {
        // 1️⃣ Remove filter from activeFilters
        const index = activeFilters.findIndex(
            f => f.type === filterName
        );

        if (index !== -1) {
            activeFilters.splice(index, 1);
        }

        console.log("Active filters after removal:", activeFilters);

        // 2️⃣ If no filters left → load all cars
        if (activeFilters.length === 0) {
            console.log("No active filters. Loading full list.");
            loadCars();
            return;
        }

        // 3️⃣ Build query params from remaining filters
        const params = new URLSearchParams();

        activeFilters.forEach(filter => {
            if (filter.type === "category") {
                params.set("category", filter.value.name);
            }

            if (filter.type === "transmission") {
                params.set("transmission", filter.value.code ?? filter.value.name);
            }

            if (filter.type === "location") {
                params.set("location", filter.value.code ?? filter.value.name);
            }
        });

        const url = `https://localhost:5001/api/car/search?${params.toString()}`;
        console.log("Filtered API URL (after removal):", url);

        // 4️⃣ Fetch filtered results
        const response = await fetch(url);
        const cars = await response.json();

        console.log("Filtered cars after removal:", cars);

        // 5️⃣ Render results
        const container = document.getElementById("searchResultContainer");
        container.innerHTML = "";

        cars.forEach(car => {
            const col = document.createElement("div");
            col.className = "col-12 mb-4";

            col.innerHTML = `
                <div class="card shadow-sm">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img 
                                src="https://localhost:5001${car.imageUrl}"
                                class="img-fluid rounded-start"
                                alt="${car.make} ${car.model}"
                            >
                        </div>

                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${car.make} ${car.model} (${car.year})
                                </h5>

                                <p class="card-text mb-1">
                                    <strong>Category:</strong> ${car.category ?? "—"}
                                </p>

                                <p class="card-text mb-1">
                                    <strong>Transmission:</strong> ${car.transmission ?? "—"}
                                </p>

                                <p class="card-text mb-1">
                                    <strong>Price:</strong> €${Number(car.dailyPrice).toFixed(2)} / day
                                </p>

                                <button class="btn btn-primary mt-2">
                                    Rent Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(col);
        });

    } catch (error) {
        console.error("Failed to load unfiltered list:", error);
    }
}

 
