import { BASE_URL, API_KEY } from "../api/constants";

export const fetchVenueById = async (id) => {
    const endpoint = `/holidaze/venues/${id}?_bookings=true`;
    const url = BASE_URL + endpoint;
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
    };

    try {
        const response = await fetch(url, { method: "GET", headers });
        if (!response.ok) {
            throw new Error("Failed to fetch venue data");
        }
        const data = await response.json();

        return data.data;
    } catch (err) {
        console.error("Error fetching venue:", err);
        throw err;
    }
};
