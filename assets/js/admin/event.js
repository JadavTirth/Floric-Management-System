document.addEventListener("DOMContentLoaded", loadEvents);

const API_URL = "http://localhost:8000/api/events";

async function loadEvents() {
    try {
        const res = await fetch(API_URL);
        const result = await res.json();
        const events = result.data || result;

        const tableBody = document.getElementById("eventTableBody");
        if (!tableBody) return;

        tableBody.innerHTML = "";

        events.forEach(event => {
            const row = `
                <tr>
                    <td><img src="${event.image || 'https://via.placeholder.com/60'}" class="event-img"></td>
                    <td>${event.eventName}</td>
                    <td>${event.tagline || "-"}</td>
                    <td>${event.department?.departmentName || "-"}</td>
                    <td>${event.eventFees || 0}</td>
                    <td>${event.minParticipants || 1} / ${event.maxParticipants || 1}</td>
                    <td>${event.maxGroups || "-"}</td>
                    <td>${event.location || "-"}</td>
                    <td>${event.coordinator?.userName || "-"}</td>
                    <td>${event.studentCoordinator || "-"}</td>
                    <td>
                        1st: ${event.firstPrize || "-"}<br>
                        2nd: ${event.secondPrize || "-"}<br>
                        3rd: ${event.thirdPrize || "-"}
                    </td>
                    <td>${formatDate(event.createdAt)}</td>
                    <td>${formatDate(event.updatedAt)}</td>
                    <td>${event.modifiedBy?.userName || "-"}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-2"
                            onclick="editEvent('${event._id}')">Edit</button>
                        <button class="btn btn-danger btn-sm"
                            onclick="deleteEvent('${event._id}')">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (err) {
        alert("Failed to load events ❌");
        console.error(err);
    }
}

function formatDate(date) {
    return new Date(date).toLocaleString();
}

async function deleteEvent(id) {
    if (!confirm("Delete this event?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadEvents();
}

function editEvent(id) {
    window.location.href = `edit_event.html?id=${id}`;
}