document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get("carId");

    if (!carId) {
        alert("No car selected.");
        window.location.href = "search.html";
        return;
    }
    const carIdNumber = Number(carId);
    if (Number.isNaN(carIdNumber)) {
        alert("Invalid car ID.");
        window.location.href = "search.html";
        return;
    }

    console.log("Car ID (string):", carId);
    console.log("Car ID (number):", carIdNumber);

    // 🚗 Continue loading reservation details here
    loadCarDetails(carIdNumber);
    document.getElementById("userForm").innerHTML = ` 
<form id="rentalForm" class="card shadow-sm p-4 mt-4" onsubmit="submitReservation(event)">

    <h4 class="mb-3">Driver Information</h4>

    <div class="row g-3">
        <div class="col-md-6">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control" required>
        </div>

        <div class="col-md-6">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-control" required>
        </div>

        <div class="col-md-6">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" required>
        </div>

        <div class="col-md-6">
            <label class="form-label">Phone</label>
            <input type="tel" class="form-control" required>
        </div>

        <div class="col-md-6">
            <label class="form-label">Date of Birth</label>
            <input type="date" class="form-control" required>
        </div>

        <div class="col-md-6">
            <label class="form-label">Driver’s License Number</label>
            <input type="text" class="form-control" required>
        </div>

        <div class="col-md-6">
            <label class="form-label">License Issuing Country</label>
            <input type="text" class="form-control" required>
        </div>

        <div class="col-md-6">
            <label class="form-label">License Expiry Date</label>
            <input type="date" class="form-control" required>
        </div>
    </div>

    <hr class="my-4">

    <h4 class="mb-3">Rental Period</h4>

    <div class="row g-3">
        <div class="col-md-6">
            <label class="form-label">Pickup Date</label>
            <input type="date" class="form-control" required>
        </div>

        <div class="col-md-6">
            <label class="form-label">Return Date</label>
            <input type="date" class="form-control" required>
        </div>
    </div>

    <div class="form-check mt-4">
        <input class="form-check-input" type="checkbox" required>
        <label class="form-check-label">
            I agree to the rental terms and conditions
        </label>
    </div>

    <button type="submit" class="btn btn-primary mt-4 w-100">
        Confirm Reservation
    </button>
</form>
`;

});


async function loadCarDetails(carId) {
    try {
        const response = await fetch(
            `https://localhost:5001/api/car/${carId}`
        );
        if (!response.ok) {
            throw new Error("Car not found");
        }
        const car = await response.json();
        console.log("Loaded car:", car);
        loadCar(car);

        // TODO: update the DOM with car info
    } catch (err) {
        console.error(err);
        alert("Failed to load car details.");
    }
}


async function loadCar(car) {

    const container = document.getElementById("selectedCar");

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


}

async function submitReservation(event) {
    event.preventDefault();  

    const params = new URLSearchParams(window.location.search);
    const carId = Number(params.get("carId"));

    const form = event.target;

    const reservation = {
        carId: carId,
        firstName: form.querySelector('input[label="First Name"], input[type="text"]').value,
        lastName: form.querySelectorAll('input[type="text"]')[1].value,
        email: form.querySelector('input[type="email"]').value,
        phone: form.querySelector('input[type="tel"]').value,
        dateOfBirth: form.querySelectorAll('input[type="date"]')[0].value,
        driversLicenseNumber: form.querySelectorAll('input[type="text"]')[2].value,
        licenseIssuingCountry: form.querySelectorAll('input[type="text"]')[3].value,
        licenseExpiryDate: form.querySelectorAll('input[type="date"]')[1].value,
        pickupDate: form.querySelectorAll('input[type="date"]')[2].value,
        returnDate: form.querySelectorAll('input[type="date"]')[3].value
    };

    try {
        const response = await fetch("https://localhost:5001/api/reservations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reservation)
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }

        const result = await response.json();
        console.log("Reservation created:", result);

        alert("Reservation confirmed!");
      window.location.href = "homepage.html";

    } catch (error) {
        console.error("Reservation failed:", error);
        alert("Failed to create reservation: " + error.message);
    }

    


}
