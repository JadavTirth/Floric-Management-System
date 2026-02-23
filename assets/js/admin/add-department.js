console.log("JS LOADED");

document.addEventListener("DOMContentLoaded", () => {
    loadInstitutes();
    loadUsers();
});

const API_URL = "http://localhost:8000/api/departments";
const INSTITUTE_API = "http://127.0.0.1:8000/api/institutes";
const USERS_API = "http://127.0.0.1:8000/api/auth/users"; // ✅ FIXED

const form = document.getElementById("departmentForm");

// ========================
// LOAD INSTITUTES
// ========================
async function loadInstitutes() {
    try {
        const res = await fetch(INSTITUTE_API);
        const institutes = await res.json();

        const select = document.getElementById("instituteID");

        institutes.forEach(inst => {
            select.add(new Option(inst.instituteName, inst._id));
        });

    } catch {
        console.error("Failed to load institutes");
    }
}

// ========================
// LOAD USERS
// ========================
async function loadUsers() {
    try {
        const res = await fetch(USERS_API);
        const users = await res.json();

        const coordSelect = document.getElementById("departmentCoordinatorID");
        const modifiedSelect = document.getElementById("modifiedBy");

        users.forEach(user => {
            coordSelect?.add(new Option(user.userName, user._id));
            modifiedSelect?.add(new Option(user.userName, user._id));
        });

    } catch {
        console.error("Failed to load users");
    }
}

// ========================
// FORM SUBMIT
// ========================
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = departmentName.value.trim();
    const description = departmentDescription.value.trim();
    const institute = instituteID.value;
    const coordinator = departmentCoordinatorID.value;
    const modifiedBy = document.getElementById("modifiedBy")?.value;

    const imageFile = document.getElementById("departmentImage").files[0];

    if (!name || !institute) {
        alert("Department Name & Institute required ❌");
        return;
    }

    let imageBase64 = "";

    if (imageFile) {
        imageBase64 = await toBase64(imageFile);
    }

    const payload = {
        departmentName: name,
        departmentDescription: description,
        departmentImage: imageBase64,
        institute: institute,
        departmentCoordinator: coordinator || null,
        modifiedBy: modifiedBy || null
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (!res.ok) throw new Error(result.message);

        alert("Department Created Successfully ✅");

        // ✅ redirect after save
        window.location.href = "departments.html";

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
        reader.onerror = reject;
    });
}