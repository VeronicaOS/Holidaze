import React, { useEffect, useState } from "react";
import { useProfile } from "../../../context/profileContext";
import { fetchProfileBookings } from "../../../utils/fetchProfileBookings.jsx";
import styles from "../profilePage.module.css";
import Button from "../../../components/button/button";

const BookingsSection = () => {
    const { profile } = useProfile();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            if (!profile?.name) {
                setError("Profile not found");
                setIsLoading(false);
                return;
            }
            try {
                const bookings = await fetchProfileBookings(profile.name);
                setBookings(Array.isArray(bookings) ? bookings : []);
            } catch (err) {
                setError(
                    err.message || "An error occurred while fetching bookings."
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, [profile]);

    useEffect(() => {
        if (successMessage) {
            const timeout = setTimeout(() => {
                setSuccessMessage("");
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [successMessage]);

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            try {
                setBookings((prev) =>
                    prev.filter((booking) => booking.id !== bookingId)
                );
                setSuccessMessage("Booking canceled successfully!");
            } catch (error) {
                setError(error.message || "Failed to cancel booking.");
            }
        }
    };

    if (isLoading) {
        return <p>Loading bookings...</p>;
    }
    if (error) {
        return <p className="error">{error}</p>;
    }
    if (bookings.length === 0) {
        return <p>No bookings available.</p>;
    }

    return (
        <div className={styles.bookingsSection}>
            <h2 className={styles.bookingsTitle}>Your Bookings</h2>
            {successMessage && (
                <div className={styles.successMessageOverlay}>
                    <div className={styles.successMessage}>
                        {successMessage}
                    </div>
                </div>
            )}
            <div className={styles.bookingsGrid}>
                {bookings.map((booking) => (
                    <div key={booking.id} className={styles.bookingCard}>
                        <div className={styles.bookingDetails}>
                            <h3 className={styles.bookingTitle}>
                                {booking.venue?.name || "Venue Name"}
                            </h3>
                            <p>
                                <strong>Check-in: </strong>
                                {new Date(
                                    booking.dateFrom
                                ).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Check-out: </strong>
                                {new Date(booking.dateTo).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Guests: </strong> {booking.guests}
                            </p>
                            <p>
                                <strong>Venue: </strong>
                                {booking.venue?.name || "Venue Name"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingsSection;
