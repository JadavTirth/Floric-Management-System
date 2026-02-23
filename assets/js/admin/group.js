async function loadGroups() {
    try {
        const res = await fetch(API_URL);
        const groups = await res.json();

        const tableBody = document.getElementById("groupTableBody");
        tableBody.innerHTML = "";

        groups.forEach(group => {

            const paymentBadge = group.isPaymentDone
                ? `<span class="badge bg-success">Paid</span>`
                : `<span class="badge bg-danger">Not Paid</span>`;

            const attendanceBadge = group.isPresent
                ? `<span class="badge bg-success">Present</span>`
                : `<span class="badge bg-secondary">Absent</span>`;

            const row = `
                <tr>
                    <td>${group.groupID ?? "-"}</td>
                    <td>${group.groupName ?? "-"}</td>
                    <td>${group.event?.eventName ?? "-"}</td>
                    <td>${paymentBadge}</td>
                    <td>${attendanceBadge}</td>
                    <td>${formatDate(group.createdAt)}</td>
                    <td>${formatDate(group.updatedAt)}</td>
                    <td>${group.modifiedBy?.userName ?? "-"}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-1"
                            onclick="editGroup('${group._id}')">
                            Edit
                        </button>

                        <button class="btn btn-danger btn-sm me-1"
                            onclick="deleteGroup('${group._id}')">
                            Delete
                        </button>

                        <button class="btn btn-primary btn-sm"
                            onclick="toggleAttendance('${group._id}')">
                            Toggle
                        </button>
                    </td>
                </tr>
            `;

            tableBody.insertAdjacentHTML("beforeend", row);
        });

    } catch (err) {
        console.error(err);
        alert("Failed to load groups ❌");
    }
}