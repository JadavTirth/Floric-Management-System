document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const data = await apiRequest("/auth/login", "POST", {
            emailAddress: email,
            userPassword: password
        });

        localStorage.setItem("token", data.token);

        alert("Login Successful 🚀");

        // Safe check
        if (data.user && data.user.role === "admin") {
            window.location.href = "admin/dashboard.html";
        } else {
            window.location.href = "../../pages/user/home.html";
        }

    } catch (error) {
        alert(error.message);
    }
});
