document.addEventListener("DOMContentLoaded", () => {
  loadInstitutes();
  loadUsers();
});

const API_URL = "http://localhost:8000/api/departments";
const INSTITUTE_API = "http://localhost:8000/api/institutes";
const USERS_API = "http://localhost:8000/api/users";

const form = document.getElementById("departmentForm");

// ========================
// LOAD INSTITUTES
// ========================
async function loadInstitutes() {
  try {
    const res = await fetch(INSTITUTE_API);
    const data = await res.json();
    const institutes = data.data || data;

    const select = document.getElementById("instituteID");

    institutes.forEach(inst => {
      const option = new Option(inst.instituteName, inst._id);
      select.add(option);
    });

  } catch (err) {
    console.error(err);
    alert("Unable to load institutes ❌");
  }
}

// ========================
// LOAD USERS (Coordinator)
// ========================
async function loadUsers() {
  try {
    const res = await fetch(USERS_API);
    const users = await res.json();

    const coordSelect = document.getElementById("departmentCoordinatorID");

    users.forEach(user => {
      const option = new Option(user.userName, user._id);
      coordSelect.add(option);
    });

  } catch (err) {
    console.error(err);
    alert("Unable to load users ❌");
  }
}

// ========================
// FORM SUBMIT
// ========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("departmentName").value.trim();
  const description = document.getElementById("departmentDescription").value.trim();
  const institute = document.getElementById("instituteID").value;
  const coordinator = document.getElementById("departmentCoordinatorID").value;
  const imageFile = document.getElementById("departmentImage").files[0];

  if (!name || !institute) {
    alert("Department Name & Institute are required ❌");
    return;
  }

  let imageBase64 = "";

  // convert image to base64 (optional)
  if (imageFile) {
    imageBase64 = await toBase64(imageFile);
  }

  const payload = {
    departmentName: name,
    departmentDescription: description,
    departmentImage: imageBase64,
    institute: institute,
    departmentCoordinator: coordinator || null
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to create department");
    }

    alert("Department created successfully ✅");
    form.reset();

  } catch (error) {
    console.error(error);
    alert(error.message || "Error creating department ❌");
  }
});

// ========================
// CONVERT IMAGE TO BASE64
// ========================
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}