document.getElementById("adminLoginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await apiRequest("/auth/login", "POST", {
            emailAddress: email,
            userPassword: password
        });

        console.log("Login Response:", response);

        // 🔥 FIX HERE
        const user = response.data.user;
        const token = response.data.token;

        if (!user || user.isAdmin !== true) {
            alert("Access denied ❌ Admin only.");
            return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert("Admin Login Successful 🚀");
        window.location.href = "../../pages/admin/dashboard.html";


    } catch (error) {
        alert(error.message);
    }
});
