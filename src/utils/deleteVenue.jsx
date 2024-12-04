import { BASE_URL, API_KEY } from "../api/constants"; // Adjust the path as needed

export const deleteVenue = async (venueId) => {
    const url = `${BASE_URL}/holidaze/venues/${venueId}`;
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": API_KEY,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.errors?.[0]?.message || "Failed to delete venue."
            );
        }

        return true; // Indicate success
    } catch (error) {
        console.error("Error deleting venue:", error.message || error);
        throw error; // Re-throw error for handling in calling code
    }
};
