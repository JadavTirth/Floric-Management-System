document.addEventListener("DOMContentLoaded", loadDepartments);

const API_URL = "http://localhost:8000/api/departments";

async function loadDepartments() {
  try {
    const res = await fetch(API_URL);
    const result = await res.json();
    const departments = result.data || result;

    const tableBody = document.getElementById("departmentTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    departments.forEach((dep) => {
      const row = document.createElement("tr");

      const imageUrl = dep.departmentImage || "https://via.placeholder.com/60";

      row.innerHTML = `
        <td><img src="${imageUrl}" width="50"></td>
        <td>${dep.departmentName}</td>
        <td>${dep.departmentDescription || "-"}</td>
        <td>${dep.institute?.instituteName || "-"}</td>
        <td>${dep.departmentCoordinator?.userName || "-"}</td>
        <td>${formatDate(dep.createdAt)}</td>
        
        <td>
          
          <button class="btn btn-danger btn-sm"
            onclick="deleteDepartment('${dep._id}')">Delete</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    alert("Failed to load departments ❌");
  }
}

function formatDate(date) {
  return new Date(date).toLocaleString();
}

async function deleteDepartment(id) {
  if (!confirm("Delete this department?")) return;

  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadDepartments();
}

function editDepartment(id) {
  window.location.href = `edit_department.html?id=${id}`;
}
