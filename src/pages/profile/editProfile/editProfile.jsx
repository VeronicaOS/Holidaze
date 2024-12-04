import React, { useState } from "react";
import { editProfile } from "../../../utils/editProfile"; // Import the utility function
import styles from "../profilePage.module.css";
import Button from "../../../components/button/button";

const EditProfileModal = ({ profile, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: profile?.name || "",
        avatar: profile?.avatar?.url || "",
        bio: profile?.bio || "",
        email: profile?.email || "",
    });
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsUpdating(true);
            setError(null);

            const updatedData = {
                name: formData.name,
                bio: formData.bio,
                email: formData.email,
                avatar: formData.avatar
                    ? { url: formData.avatar } // Ensure avatar is an object
                    : null, // Or null if not provided
            };

            const updatedProfile = await editProfile(profile.name, updatedData);

            onUpdate(updatedProfile); // Pass updated profile to the parent
            onClose(); // Close the modal
        } catch (err) {
            console.error("Error updating profile:", err.message || err);
            setError(err.message || "Failed to update profile.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="avatar">Avatar URL:</label>
                        <input
                            type="url"
                            id="avatar"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="bio">Bio:</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.actions}>
                        <Button
                            type="button"
                            onClick={onClose}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isUpdating}
                        >
                            {isUpdating ? "Updating..." : "Update Profile"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
