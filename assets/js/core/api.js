const BASE_URL = "http://localhost:3000/api";

// Generic API request function
async function apiRequest(endpoint, method = "GET", data = null, requiresAuth = false) {

    const headers = {
        "Content-Type": "application/json"
    };

    // Attach token if required
    if (requiresAuth) {
        const token = localStorage.getItem("token");
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }
    }

    const options = {
        method,
        headers
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "API Error");
        }

        return result;

    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
}
