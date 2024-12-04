import React from "react";
import styles from "./viewBookings.module.css";
import Button from "../../../components/button/button";

const ViewBookingsModal = ({ bookings, onClose }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>View Bookings</h2>
                {bookings.length > 0 ? (
                    <div className={styles.bookingsList}>
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className={styles.bookingCard}
                            >
                                <p className={styles.userName}>
                                    {booking.customer?.name || "N/A"}
                                </p>
                                <p>
                                    <strong>Check-in:</strong>{" "}
                                    {new Date(
                                        booking.dateFrom
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Check-out:</strong>{" "}
                                    {new Date(
                                        booking.dateTo
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Guests:</strong> {booking.guests}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {booking.customer?.email || "N/A"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No bookings available for this venue.</p>
                )}
                <div className={styles.actions}>
                    <Button
                        type="button"
                        onClick={onClose}
                        className={styles.closeButton}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ViewBookingsModal;
