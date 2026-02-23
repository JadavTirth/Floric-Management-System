const BASE_URL = "http://localhost:000/api";

// Generic API request function (No Auth)
async function apiRequest(endpoint, method = "GET", data = null) {

    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
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