document.addEventListener("DOMContentLoaded", loadReservationsTable);

async function loadReservationsTable() {
    try {
        const response = await fetch("https://localhost:5001/api/reservations");
        if (!response.ok) {
            throw new Error("Failed to load reservations");
        }

        const reservations = await response.json();
        console.log("Reservations:", reservations);

        const tbody = document.getElementById("reservationsTableBody");
        tbody.innerHTML = "";

        reservations.forEach((r, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
    <a href="#" onclick="openReservationEditor(${r.id}); return false;">
        ${r.id}
    </a>
</td>

                <td>${r.carId}</td>
                <td>${r.firstName} ${r.lastName}</td>
                <td>${r.email}</td>
                <td>${r.phone}</td>
                <td>${new Date(r.pickupDate).toLocaleDateString()}</td>
                <td>${new Date(r.returnDate).toLocaleDateString()}</td>
                <td>€${Number(r.dailyPrice).toFixed(2)}</td>
                <td><strong>€${Number(r.totalPrice).toFixed(2)}</strong></td>
            `;

            tbody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading reservations:", error);
    }
}
async function openReservationEditor(reservationId) {
    console.log("Editing reservation:", reservationId);

    // Remove table
    const table = document.querySelector("table");
    if (table) table.remove();

    // Load reservation data
    try {
        const response = await fetch(`https://localhost:5001/api/reservations`);
        const reservations = await response.json();

        const reservation = reservations.find(r => r.id === reservationId);
        if (!reservation) {
            alert("Reservation not found");
            return;
        }

        renderReservationEditForm(reservation);

    } catch (error) {
        console.error("Failed to load reservation:", error);
    }
}
function renderReservationEditForm(r) {
    const container = document.createElement("div");
    container.className = "container mt-4";
    container.id = "reservationEditor";

    container.innerHTML = `
        <h3>Edit Reservation #${r.id}</h3>

        <form id="editReservationForm" class="card p-4 shadow-sm">
            <div class="row g-3">

                <div class="col-md-6">
                    <label class="form-label">First Name</label>
                    <input class="form-control" value="${r.firstName}">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Last Name</label>
                    <input class="form-control" value="${r.lastName}">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Email</label>
                    <input class="form-control" value="${r.email}">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Phone</label>
                    <input class="form-control" value="${r.phone}">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Pickup Date</label>
                    <input type="date" class="form-control" value="${r.pickupDate.split("T")[0]}">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Return Date</label>
                    <input type="date" class="form-control" value="${r.returnDate.split("T")[0]}">
                </div>

            </div>

            <div class="mt-4 d-flex gap-2">
                <button type="button" class="btn btn-primary" onclick="saveReservation(${r.id})">
                    Save Changes
                </button>

                <button type="button" class="btn btn-secondary" onclick="location.reload()">
                    Cancel
                </button>
            </div>
        </form>
    `;

    document.body.appendChild(container);
}

async function saveReservation(reservationId) {
    const form = document.getElementById("editReservationForm");
    const inputs = form.querySelectorAll("input");

    const payload = {
        firstName: inputs[0].value,
        lastName: inputs[1].value,
        email: inputs[2].value,
        phone: inputs[3].value,
        pickupDate: inputs[4].value,
        returnDate: inputs[5].value
    };

    try {
        const response = await fetch(
            `https://localhost:5001/api/reservations/${reservationId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }

        alert("Reservation updated successfully!");
        location.reload();

    } catch (error) {
        console.error("Update failed:", error);
        alert(error.message || "Failed to update reservation");
    }
}

