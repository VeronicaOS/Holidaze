import React, { useState, useEffect } from "react";
import useFormData from "./formData/formData";
import LoginForm from "./loginForm/loginForm";
import { useProfile } from "../../context/profileContext";
import { BASE_URL, API_KEY } from "../../api/constants";
import styles from "./login.module.css";

const LoginPage = () => {
    const { fetchProfile } = useProfile();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        document.title = "Holidaze - Login Page";
    }, []);

    const { formData, handleChange, handleSubmit, isLoading } = useFormData({
        initialState: { email: "", password: "" },
        submitAction: async (formData) => {
            const url = `${BASE_URL}/auth/login`;
            const headers = {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            };

            try {
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

                localStorage.setItem("token", token);
                localStorage.setItem("username", name);

                const profileResponse = await fetch(
                    `${BASE_URL}/holidaze/profiles/${name}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "X-Noroff-API-Key": API_KEY,
                        },
                    }
                );

                if (!profileResponse.ok) {
                    throw new Error(
                        `Profile fetch failed with status: ${profileResponse.status}`
                    );
                }

                const profileData = await profileResponse.json();

                localStorage.setItem(
                    "profile",
                    JSON.stringify(profileData.data)
                );

                window.location.href = "/";
            } catch (error) {
                console.error("Error during login or fetching profile:", error);
                setErrorMessage(error.message);

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
