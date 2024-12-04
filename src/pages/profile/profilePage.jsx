import React, { useEffect, useState } from "react";
import { useProfile } from "../../context/profileContext";
import styles from "./profilePage.module.css"; // Create a CSS module for styles
import sharedStyles from "../styles.module.css";
import VenuesSection from "./profileVenues/profileVenues";
import BookingsSection from "./profileBookings/profileBookings";
import EditProfileModal from "./editProfile/editProfile"; // Import the EditProfileModal component
import Button from "../../components/button/button"; // Optional: Reusable Button component

const ProfilePage = () => {
    const { profile, fetchProfile, setProfile } = useProfile();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username"); // Assuming you store the username in localStorage
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal visibility state
    const [successMessage, setSuccessMessage] = useState(""); // Success message state

    useEffect(() => {
        document.title = "Holidaze - Profile Page";
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!profile || !profile.name) {
                console.log("Fetching profile for username:", username);

                // Fetch fresh data from the API
                await fetchProfile(username, token);
            }
        };

        fetchData();
    }, [profile, fetchProfile, username, token]);

    const handleProfileUpdate = (updatedProfile) => {
        setProfile(updatedProfile); // Update the profile in context
        setSuccessMessage("Profile updated successfully!");
        setIsEditModalOpen(false); // Close the modal

        // Save the updated profile to localStorage to ensure persistence
        localStorage.setItem("profile", JSON.stringify(updatedProfile));

        // Hide the success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };

    return (
        <div className={sharedStyles.wrapper}>
            <div className={`${styles.container} ${sharedStyles.mainPadding}`}>
                {/* Profile Information */}
                <div className={styles.profileCard}>
                    <h1 className={styles.profileName}>
                        {profile?.name || "Name"}
                    </h1>
                    <img
                        src={profile?.avatar.url}
                        alt={`${profile?.name}'s avatar`}
                        className={styles.profileAvatar}
                    />
                    <p className={styles.bio}>
                        <span>Bio:</span>
                        {profile?.bio}
                    </p>
                    <p className={styles.email}>
                        <span>Email:</span>
                        {profile?.email || "example@example.com"}
                    </p>
                    <Button
                        className={styles.editProfileButton}
                        onClick={() => setIsEditModalOpen(true)}
                    >
                        Edit Profile
                    </Button>
                </div>

                {successMessage && (
                    <div className={styles.successMessageOverlay}>
                        <div className={styles.successMessage}>
                            {successMessage}
                        </div>
                    </div>
                )}

                <div className={styles.venuesBookingsList}>
                    {/* Conditionally Render Venues or Bookings */}
                    {profile?.venueManager ? (
                        <VenuesSection
                            managerUsername={profile.name}
                            token={token}
                        />
                    ) : (
                        <BookingsSection
                            username={profile.name}
                            token={token}
                        />
                    )}
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <EditProfileModal
                    profile={profile}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleProfileUpdate}
                />
            )}
        </div>
    );
};

export default ProfilePage;
