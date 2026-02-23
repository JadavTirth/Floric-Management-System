document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!name || !email || !password || !confirmPassword) {
            alert("All fields are required ❌");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match ❌");
            return;
        }

        try {

            const res = await fetch("http://localhost:8000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: name,
                    emailAddress: email,
                    userPassword: password
                })
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            alert("Registration Successful 🎉 Please login.");
            window.location.href = "../../pages/auth/login.html";

        } catch (error) {
            alert(error.message || "Registration failed ❌");
        }
    });

});