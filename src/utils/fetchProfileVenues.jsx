import { BASE_URL, API_KEY } from "../api/constants";

export const fetchProfileVenues = async (profileName) => {
    const endpoint = `/holidaze/profiles/${profileName}?_venues=true`;
    const url = BASE_URL + endpoint;
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
    };

    try {
        const response = await fetch(url, { method: "GET", headers });
        if (!response.ok) {
            throw new Error("Failed to fetch venues data");
        }

        const result = await response.json();

        return result.data?.venues || [];
    } catch (err) {
        console.error("Error fetching venues data:", err);
        throw err;
    }
};
