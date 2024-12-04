import { BASE_URL, API_KEY } from "../api/constants";

export const editProfile = async (profileName, updatedData) => {
    const url = `${BASE_URL}/holidaze/profiles/${profileName}`;
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
    };

    try {
        const payload = {
            ...updatedData,
            avatar: updatedData.avatar || null,
        };

        const response = await fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.errors?.[0]?.message || "Failed to update profile."
            );
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error in editProfile:", error);
        throw error;
    }
};
