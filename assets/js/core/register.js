document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");

    if (!form) return; // safety check

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            alert("All fields are required ❌");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match ❌");
            return;
        }

        try {

            const response = await apiRequest("/auth/register", "POST", {
                userName: name,
                emailAddress: email,
                userPassword: password
            });

            console.log("Register Response:", response);

            alert("Registration Successful 🎉 Please login.");

            // Redirect to login page
            window.location.href = "../../pages/auth/login.html";

        } catch (error) {
            alert(error.message || "Registration failed ❌");
        }
    });

});
