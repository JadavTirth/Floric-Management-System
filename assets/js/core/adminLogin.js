
document.addEventListener("DOMContentLoaded", function () {

    const API_URL = "http://localhost:8000/api/auth/";

    
    const adminForm = document.getElementById("adminLoginForm");

    if (adminForm) {
        adminForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            try {
                const res = await fetch(API_URL + "login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        emailAddress: email,
                        userPassword: password
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Login failed");
                }

                // ✅ check admin
                if (!data.user.isAdmin) {
                    alert("Access denied ❌ Admin only");
                    return;
                }

                alert("Admin Login Successful 🚀");
                window.location.href = "http://127.0.0.1:5501/pages/admin/dashboard.html";

            } catch (error) {
                alert(error.message);
            }
        });
    }

  

});
