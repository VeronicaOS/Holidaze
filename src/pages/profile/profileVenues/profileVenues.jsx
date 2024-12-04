import React, { useEffect, useState } from "react";
import { useProfile } from "../../../context/profileContext"; // Access the profile context
import { fetchProfileVenues } from "../../../utils/fetchProfileVenues"; // Fetch venues API function
import { fetchVenueById } from "../../../utils/fetchVenueDetails"; // Fetch venue details (for bookings)
import ViewBookingsModal from "../../venueManager/viewBookings/viewBookings"; // Modal for viewing bookings
import UpdateVenueModal from "../../venueManager/updateVenue/updateVenue"; // Modal for updating venues
import styles from "../profilePage.module.css";
import { Link } from "react-router-dom";
import Button from "../../../components/button/button";
import { deleteVenue } from "../../../utils/deleteVenue";

const VenuesSection = () => {
    const { profile } = useProfile(); // Get profile from the context
    const [venues, setVenues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVenue, setSelectedVenue] = useState(null); // For opening update modal
    const [selectedBookings, setSelectedBookings] = useState([]); // Bookings for the selected venue
    const [showBookingsModal, setShowBookingsModal] = useState(false); // Toggle bookings modal
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchVenues = async () => {
            if (!profile?.name) {
                setError("Profile not found");
                setIsLoading(false);
                return;
            }
            try {
                const venues = await fetchProfileVenues(profile.name); // Fetch venues only
                setVenues(Array.isArray(venues) ? venues : []); // Ensure venues is an array
            } catch (err) {
                setError(
                    err.message || "An error occurred while fetching venues."
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchVenues();
    }, [profile]);

    useEffect(() => {
        if (successMessage) {
            const timeout = setTimeout(() => {
                setSuccessMessage(""); // Clear the success message after 3 seconds
            }, 1500);

            return () => clearTimeout(timeout); // Cleanup the timeout on unmount
        }
    }, [successMessage]);

    const handleUpdateVenue = async (updatedVenue) => {
        try {
            console.log("Venue updated:", updatedVenue);

            // Refetch the list of venues
            const refreshedVenues = await fetchProfileVenues(profile.name);
            setVenues(refreshedVenues);

            // Close the modal
            setSelectedVenue(null);
            setSuccessMessage("Venue updated successfully!"); // Show success message
        } catch (err) {
            console.error("Error refreshing venues:", err);
            setError("Unable to refresh venue data.");
        }
    };

    const handleViewBookings = async (venue) => {
        try {
            console.log("Selected venue for bookings:", venue);

            if (!venue?.id) {
                throw new Error("Invalid venue ID");
            }

            if (venue.bookings && venue.bookings.length > 0) {
                console.log(
                    `Using existing bookings for venue ID: ${venue.id}`
                );
                setSelectedBookings(venue.bookings);
            } else {
                const detailedVenue = await fetchVenueById(venue.id);
                console.log("Fetched detailed venue data:", detailedVenue);

                setSelectedBookings(detailedVenue.bookings || []);
            }
            setShowBookingsModal(true);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError("Unable to load bookings.");
        }
    };

    const handleModalClose = () => {
        setSelectedVenue(null);
        setSelectedBookings([]);
        setShowBookingsModal(false);
    };

    const handleDeleteVenue = async (venueId) => {
        if (window.confirm("Are you sure you want to delete this venue?")) {
            try {
                const deleteSuccess = await deleteVenue(venueId);
                if (deleteSuccess) {
                    setVenues((prev) =>
                        prev.filter((venue) => venue.id !== venueId)
                    );
                    setSuccessMessage("Venue deleted successfully!");
                }
            } catch (error) {
                setError(error.message || "Failed to delete venue.");
            }
        }
    };

    if (isLoading) {
        return <p>Loading venues...</p>;
    }
    if (error) {
        return <p className="error">{error}</p>;
    }
    if (venues.length === 0) {
        return <p>No venues available.</p>;
    }

    return (
        <div className={styles.venuesSection}>
            <h2 className={styles.venuesTitle}>Your Venues</h2>
            {successMessage && (
                <div className={styles.successMessageOverlay}>
                    <div className={styles.successMessage}>
                        {successMessage}
                    </div>
                </div>
            )}

            <div className={styles.venuesGrid}>
                {venues.map((venue) => (
                    <div key={venue.id} className={styles.venueCard}>
                        <img
                            src={venue.media?.[0]?.url || "default-venue.jpg"}
                            alt={venue.name}
                            className={styles.venueImage}
                        />
                        <div className={styles.venueDetails}>
                            <h3 className={styles.venueName}>{venue.name}</h3>
                            <Link
                                to={`/venues/${venue.id}`}
                                className={styles.venueDescription}
                            >
                                View venue
                            </Link>
                            <div className={styles.venueActions}>
                                <Button
                                    className={styles.actionButton}
                                    onClick={() => setSelectedVenue(venue)}
                                >
                                    Update venue
                                </Button>
                                <Button
                                    className={styles.actionButton}
                                    onClick={() => handleViewBookings(venue)}
                                >
                                    View bookings
                                </Button>
                                <Button
                                    className={styles.actionButton}
                                    onClick={() => handleDeleteVenue(venue.id)}
                                >
                                    Delete venue
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedVenue && (
                <UpdateVenueModal
                    venue={selectedVenue}
                    onClose={handleModalClose}
                    onUpdate={handleUpdateVenue}
                />
            )}
            {showBookingsModal && (
                <ViewBookingsModal
                    bookings={selectedBookings}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
};

export default VenuesSection;
