document.addEventListener("DOMContentLoaded", () => {
    loadGroups();
    loadInstitutes();
});

const API_URL = "http://localhost:8000/api/participants";
const GROUP_API = "http://localhost:8000/api/groups";
const INST_API = "http://localhost:8000/api/institutes";

const form = document.getElementById("participantForm");

// load groups
async function loadGroups() {
    const res = await fetch(GROUP_API);
    const groups = await res.json();

    const select = document.getElementById("groupID");

    groups.forEach(g => {
        select.add(new Option(g.groupName, g._id));
    });
}

// load institutes
async function loadInstitutes() {
    const res = await fetch(INST_API);
    const institutes = await res.json();

    const select = document.getElementById("instituteID");

    institutes.forEach(inst => {
        select.add(new Option(inst.instituteName, inst._id));
    });
}

// submit
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        enrollment: document.getElementById("enrollment").value,
        institute: document.getElementById("instituteID").value,
        city: document.getElementById("city").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        group: document.getElementById("groupID").value,
        isLeader: document.getElementById("isLeader").checked
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (!res.ok) throw new Error(result.message);

        alert("Participant Added ✅");
        form.reset();

    } catch (err) {
        alert(err.message);
    }
});