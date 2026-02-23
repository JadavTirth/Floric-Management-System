document.addEventListener("DOMContentLoaded", () => {
    loadEvents();
});

const API_URL = "http://localhost:8000/api/winners";
const EVENTS_API = "http://localhost:8000/api/events";
const GROUP_API = "http://localhost:8000/api/groups";

const form = document.getElementById("winnerForm");

// load events
async function loadEvents() {
    const res = await fetch(EVENTS_API);
    const events = await res.json();

    const select = document.getElementById("eventID");

    events.forEach(e => {
        select.add(new Option(e.eventName, e._id));
    });
}

// load groups when event selected
document.getElementById("eventID").addEventListener("change", async function () {
    const eventId = this.value;
    const select = document.getElementById("groupID");

    select.innerHTML = `<option value="">Select Group</option>`;

    const res = await fetch(`${GROUP_API}?event=${eventId}`);
    const groups = await res.json();

    groups.forEach(g => {
        select.add(new Option(g.groupName, g._id));
    });
});

// submit
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const sequence = document.getElementById("sequence").value;

    if (![1,2,3].includes(Number(sequence))) {
        alert("Sequence must be 1, 2 or 3 ❌");
        return;
    }

    const data = {
        event: document.getElementById("eventID").value,
        group: document.getElementById("groupID").value,
        sequence: Number(sequence),
        modifiedBy: document.getElementById("modifiedBy").value || null
    };

    if (!data.event || !data.group) {
        alert("Select event & group ❌");
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

        alert("Winner Added 🏆");
        form.reset();

    } catch (err) {
        alert(err.message);
    }
});