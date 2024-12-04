import { useState } from "react";

const useFormData = ({ initialState, submitAction }) => {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value, // Handle checkboxes as booleans
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous errors
        setIsLoading(true); // Show loading state

        try {
            await submitAction(formData);
        } catch (err) {
            setError(err.message || "An error occurred during submission.");
        } finally {
            setIsLoading(false); // Stop loading state
        }
    };

    return { formData, handleChange, handleSubmit, isLoading, error };
};

export default useFormData;
