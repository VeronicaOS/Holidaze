import React, { useState, useEffect } from "react";
import useFormData from "./formData/formData";
import LoginForm from "./loginForm/loginForm";
import { useProfile } from "../../context/profileContext";
import { BASE_URL, API_KEY } from "../../api/constants"; // Import API key and base URL
import styles from "./login.module.css";

const LoginPage = () => {
    const { fetchProfile } = useProfile();
    const [errorMessage, setErrorMessage] = useState(""); // State for error message

    useEffect(() => {
        document.title = "Holidaze - Login Page";
    }, []);

    const { formData, handleChange, handleSubmit, isLoading } = useFormData({
        initialState: { email: "", password: "" },
        submitAction: async (formData) => {
            const url = `${BASE_URL}/auth/login`;
            const headers = {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY, // Correct header for API key
            };

            try {
                // Perform login
                const response = await fetch(url, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error(
                        "Login failed. Check your email or password."
                    );
                }

                const loginData = await response.json();
                const { accessToken: token, name } = loginData.data;

                // Save token and username
                localStorage.setItem("token", token);
                localStorage.setItem("username", name);

                // Fetch full profile
                const profileResponse = await fetch(
                    `${BASE_URL}/holidaze/profiles/${name}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`, // Bearer token
                            "X-Noroff-API-Key": API_KEY, // Correct header for API key
                        },
                    }
                );

                if (!profileResponse.ok) {
                    throw new Error(
                        `Profile fetch failed with status: ${profileResponse.status}`
                    );
                }

                const profileData = await profileResponse.json();

                // Save profile data to localStorage
                localStorage.setItem(
                    "profile",
                    JSON.stringify(profileData.data)
                );

                // Redirect to home
                window.location.href = "/";
            } catch (error) {
                console.error("Error during login or fetching profile:", error);
                setErrorMessage(error.message); // Show error message on screen

                // Clear error message after 3 seconds
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        },
    });

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <LoginForm
                        formData={formData}
                        handleChange={handleChange}
                        isLoading={isLoading}
                    />
                </form>
                {/* Conditionally render the error message */}
                {errorMessage && (
                    <div className={styles.errorMessageOverlay}>
                        <div className={styles.errorMessage}>
                            {errorMessage}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
