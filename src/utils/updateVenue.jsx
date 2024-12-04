import { BASE_URL, API_KEY } from "../api/constants";

export const updateVenue = async (venueId, updatedData) => {
    const url = `${BASE_URL}/holidaze/venues/${venueId}`;
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
    };

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error updating venue:", errorData);
            throw new Error(
                errorData.errors?.[0]?.message || "Failed to update venue."
            );
        }

        const result = await response.json();
        console.log("Venue updated successfully:", result.data);
        return result.data; // Return the updated venue data
    } catch (error) {
        console.error("Error in updateVenue:", error);
        throw error; // Re-throw the error to handle in calling code
    }
};
