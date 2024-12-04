import React, { useEffect } from "react";
import useFormData from "../login/formData/formData";
import RegisterForm from "./registerForm/registerForm";
import styles from "./register.module.css";

const RegisterPage = () => {
    useEffect(() => {
        document.title = "Holidaze - Register Page";
    }, []);
    const { formData, handleChange, handleSubmit, isLoading, error } =
        useFormData({
            initialState: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                venueManager: false,
            },
            submitAction: async (formData) => {
                if (formData.password !== formData.confirmPassword) {
                    throw new Error("Passwords do not match.");
                }

                const body = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    venueManager: formData.venueManager,
                };

                const response = await fetch(
                    "https://v2.api.noroff.dev/auth/register",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    }
                );

                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error(
                            "User already exists. Please use another email."
                        );
                    }
                    throw new Error("Registration failed. Please try again.");
                }

                const confirmed = window.confirm(
                    "Registration successful! Would you like to log in?"
                );
                if (confirmed) {
                    window.location.href = "/login";
                }
            },
        });

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <RegisterForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default RegisterPage;
