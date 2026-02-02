document.addEventListener("DOMContentLoaded", function () {
    getLocations();
    loadCars();
});

async function getLocations() {
    let PUList = document.getElementById("countryListPU");
    let DOList = document.getElementById("countryListDO");
    let url = "https://localhost:5001/api/locations";

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        option.value = data[i].code;
        option.textContent = data[i].name;

        PUList.appendChild(option);

        // clone for second select
        let optionClone = option.cloneNode(true);
        DOList.appendChild(optionClone);
    }
}
 

async function loadCars() {
    try {
        const response = await fetch("https://localhost:5001/api/car");
        const cars = await response.json();

        console.log("Cars from API:", cars);

        const grid = document.getElementById("fleetGrid");
        grid.innerHTML = "";

        cars.forEach(car => {
            const col = document.createElement("div");
            col.className = "col-md-4 d-flex justify-content-center mb-4";

            console.log("Image URL:", car.imageUrl);

            col.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img 
                        src="https://localhost:5001${car.imageUrl}" 
                        class="card-img-top" 
                        alt="${car.make} ${car.model}"
                        onerror="this.src='/images/cars/1.png'"
                    >
                    <div class="card-body">
                        <h5 class="card-title">
                            ${car.make} ${car.model}
                        </h5>

                        <p class="card-text">
                            <strong>Year:</strong> ${car.year}<br>
                            <strong>ACRISS:</strong> ${car.category ?? "—"}<br>
                            <strong>Transmission:</strong> ${car.transmission ?? "—"}<br>
                            <strong>Price:</strong> €${Number(car.dailyPrice).toFixed(2)} / day
                        </p>
                    </div>
                </div>
            `;

            grid.appendChild(col);
        });

    } catch (error) {
        console.error("Failed to load cars:", error);
    }
}

