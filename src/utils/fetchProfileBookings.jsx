import { BASE_URL, API_KEY } from "../api/constants";

export const fetchProfileBookings = async (profileName) => {
    const endpoint = `/holidaze/profiles/${profileName}?_bookings=true`;
    const url = BASE_URL + endpoint;
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
    };

    try {
        const response = await fetch(url, { method: "GET", headers });
        if (!response.ok) {
            throw new Error("Failed to fetch bookings data");
        }

        const result = await response.json();

        // Debug: Log the full response
        console.log("API Full Response (bookings):", result);

        // Return only the bookings array
        return result.data?.bookings || [];
    } catch (err) {
        console.error("Error fetching bookings data:", err);
        throw err; // Re-throw the error to handle in the calling code
    }
};
