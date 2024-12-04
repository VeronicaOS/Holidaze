import React, { createContext, useContext, useState } from "react";
import { BASE_URL, API_KEY } from "../api/constants"; // Adjust the path as needed

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(() => {
        const storedProfile = localStorage.getItem("profile");
        return storedProfile ? JSON.parse(storedProfile) : null;
    });

    const fetchProfile = async (username, token) => {
        try {
            console.log("Fetching profile for:", username);
            const url = `${BASE_URL}/holidaze/profiles/${username}`;
            console.log("Fetching from URL:", url);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-Noroff-API-Key": API_KEY,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch profile data.");
            }

            const result = await response.json();
            console.log("API Response:", result);

            console.log("Profile fetched successfully:", result.data);
            setProfile(result.data);
            localStorage.setItem("profile", JSON.stringify(result.data));
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, setProfile, fetchProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
