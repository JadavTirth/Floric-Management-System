document.addEventListener("DOMContentLoaded", loadParticipants);

const API_URL = "http://localhost:8000/api/participants";

async function loadParticipants() {
    try {
        const res = await fetch(API_URL);
        const result = await res.json();
        const participants = result.data || result;

        const tableBody = document.getElementById("participantTableBody");
        if (!tableBody) return;

        tableBody.innerHTML = "";

        participants.forEach(p => {

            const leaderBadge = p.isLeader
                ? `<span class="badge bg-success">Leader</span>`
                : `<span class="badge bg-secondary">Member</span>`;

            const row = `
                <tr>
                    <td>${p.participantID || "-"}</td>
                    <td>${p.name}</td>
                    <td>${p.enrollment}</td>
                    <td>${p.institute?.instituteName || "-"}</td>
                    <td>${p.city || "-"}</td>
                    <td>${p.mobile}</td>
                    <td>${p.email}</td>
                    <td>${p.group?.groupName || "-"}</td>
                    <td>${leaderBadge}</td>
                    <td>${formatDate(p.createdAt)}</td>
                    <td>${formatDate(p.updatedAt)}</td>
                    <td>${p.modifiedBy?.userName || "-"}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-2"
                            onclick="editParticipant('${p._id}')">Edit</button>
                        <button class="btn btn-danger btn-sm"
                            onclick="deleteParticipant('${p._id}')">Delete</button>
                    </td>
                </tr>
            `;

            tableBody.innerHTML += row;
        });

    } catch (err) {
        alert("Failed to load participants ❌");
        console.error(err);
    }
}

function formatDate(date) {
    return new Date(date).toLocaleString();
}

// ================= DELETE =================
async function deleteParticipant(id) {
    if (!confirm("Delete this participant?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadParticipants();
}

// ================= EDIT =================
function editParticipant(id) {
    window.location.href = `edit_participant.html?id=${id}`;
}