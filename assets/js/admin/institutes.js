document.addEventListener("DOMContentLoaded", loadInstitutes);

const API_URL = "http://localhost:8000/api/institutes";

async function loadInstitutes() {
    try {
        const res = await fetch(API_URL);
        const result = await res.json();

        const institutes = result.data || result;

        const tableBody = document.getElementById("instituteTableBody");
        if (!tableBody) return;

        tableBody.innerHTML = "";

        institutes.forEach(inst => {
            const row = document.createElement("tr");

            const imageUrl = inst.instituteImage || "https://via.placeholder.com/60";

            const coordinatorName =
                inst.instituteCoordinator?.userName || "—";

            const modifiedByName =
                inst.modifiedBy?.userName || "—";

            row.innerHTML = `
                <td><img src="${imageUrl}" class="institute-img"/></td>
                <td>${inst.instituteName || "-"}</td>
                <td>${inst.instituteDescription || "-"}</td>
                <td>${coordinatorName}</td>
                <td>${formatDate(inst.createdAt)}</td>
                <td>${formatDate(inst.updatedAt)}</td>
                <td>${modifiedByName}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2"
                        onclick="editInstitute('${inst._id}')">Edit</button>
                    <button class="btn btn-sm btn-danger"
                        onclick="deleteInstitute('${inst._id}')">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error(error);
        alert("Unable to load institutes ❌");
    }
}

function formatDate(date) {
    if (!date) return "-";
    return new Date(date).toLocaleString();
}

async function deleteInstitute(id) {
    if (!confirm("Delete this institute?")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) throw new Error();

        alert("Deleted ✅");
        loadInstitutes();

    } catch {
        alert("Delete failed ❌");
    }
}

function editInstitute(id) {
    window.location.href = `edit_institute.html?id=${id}`;
}