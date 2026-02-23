document.addEventListener("DOMContentLoaded", loadWinners);

const API_URL = "http://localhost:8000/api/groups";

async function loadWinners() {
    try {
        const res = await fetch(API_URL);
        const result = await res.json();
        const winners = result.data || result;

        const tableBody = document.getElementById("winnerTableBody");
        if (!tableBody) return;

        tableBody.innerHTML = "";

        winners.forEach(winner => {

            const positionBadge = getPositionBadge(winner.sequence);

            const row = `
                <tr>
                    <td>${winner._id}</td>
                    <td>${winner.event?.eventName || "-"}</td>
                    <td>${winner.group?.groupName || "-"}</td>
                    <td>${positionBadge}</td>
                    <td>${formatDate(winner.createdAt)}</td>
                    <td>${formatDate(winner.updatedAt)}</td>
                    <td>${winner.modifiedBy?.userName || "-"}</td>
                    <td>
                        <button class="btn btn-danger btn-sm"
                            onclick="deleteWinner('${winner._id}')">
                            Delete
                        </button>
                    </td>
                </tr>
            `;

            tableBody.innerHTML += row;
        });

    } catch (err) {
        alert("Failed to load winners ❌");
        console.error(err);
    }
}

// medals
function getPositionBadge(seq) {
    if (seq == 1) return `<span class="badge bg-warning text-dark">1st - Gold</span>`;
    if (seq == 2) return `<span class="badge bg-secondary">2nd - Silver</span>`;
    if (seq == 3) return `<span class="badge bg-danger">3rd - Bronze</span>`;
    return seq;
}

function formatDate(date) {
    return new Date(date).toLocaleString();
}

// delete
async function deleteWinner(id) {
    if (!confirm("Delete this winner?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadWinners();
}