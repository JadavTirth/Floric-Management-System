document.addEventListener("DOMContentLoaded", loadUsers);

const API_URL = "http://localhost:8000/api/auth/users";

async function loadUsers() {
    try {
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error("Failed to load users");

        const users = await res.json();

        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");

            const roleBadge = user.isAdmin
                ? '<span class="badge bg-danger">Admin</span>'
                : '<span class="badge bg-info text-dark">User</span>';

            const statusBadge = '<span class="badge bg-success">Active</span>';

            row.innerHTML = `
                <td>${user.userName}</td>
                <td>${user.emailAddress}</td>
                <td>${roleBadge}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error(error);
        alert("Unable to load users ❌");
    }
}