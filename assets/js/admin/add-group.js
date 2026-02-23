document.addEventListener("DOMContentLoaded", loadEvents);

const API_URL = "http://localhost:8000/api/groups";
const EVENTS_API = "http://localhost:8000/api/events";
const USERS_API = "http://localhost:8000/api/auth/users";

const form = document.getElementById("groupForm");


// load events dropdown
async function loadEvents() {
    const res = await fetch(EVENTS_API);
    const events = await res.json();

    const select = document.getElementById("eventID");

    events.forEach(e => {
        select.add(new Option(e.eventName, e._id));
    });
}


// form submit
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        groupName: document.getElementById("groupName").value,
        event: document.getElementById("eventID").value,
        isPaymentDone: document.getElementById("isPaymentDone").value === "true",
        isPresent: document.getElementById("isPresent").value === "true",
        modifiedBy: document.getElementById("modifiedBy").value || null
    };

    if (!data.groupName || !data.event) {
        alert("Group name & event required ❌");
        return;
    }

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (!res.ok) throw new Error(result.message);

        alert("Group Created ✅");
        form.reset();

    } catch (err) {
        alert(err.message);
    }
});