import React, { useState, useEffect } from "react";
import { API_KEY } from "../../../api/constants";
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css"; 
import styles from "./bookingSection.module.css";
import Button from "../../../components/button/button";

const BookingSection = ({ venueId, bookings = [] }) => {
    const [selectedDates, setSelectedDates] = useState([null, null]); 
    const [guests, setGuests] = useState(1); 
    const [isBooking, setIsBooking] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [disabledDates, setDisabledDates] = useState([]);

    useEffect(() => {
        if (bookings.length > 0) {
            const dates = bookings.flatMap((booking) => {
                const startDate = new Date(booking.dateFrom);
                const endDate = new Date(booking.dateTo);
                const range = [];

                for (
                    let d = new Date(startDate);
                    d <= endDate;
                    d.setDate(d.getDate() + 1)
                ) {
                    range.push(new Date(d));
                }

                return range;
            });
            setDisabledDates(dates);
        }
    }, [bookings]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const addBookedDatesToDisabled = (dateFrom, dateTo) => {
        const newDates = [];
        const startDate = new Date(dateFrom);
        const endDate = new Date(dateTo);

        for (
            let d = new Date(startDate);
            d <= endDate;
            d.setDate(d.getDate() + 1)
        ) {
            newDates.push(new Date(d));
        }

        setDisabledDates((prevDisabled) => [...prevDisabled, ...newDates]);
    };

   
    const handleBooking = async () => {
        if (!selectedDates[0] || !selectedDates[1]) {
            setErrorMessage("Please select both a start and an end date.");
            return;
        }

        if (guests <= 0) {
            setErrorMessage("Please enter at least 1 guest.");
            return;
        }

        try {
            setIsBooking(true);
            setErrorMessage(""); 

            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage("You must be logged in to make a booking.");
                return;
            }

            const bookingDetails = {
                dateFrom: formatDate(selectedDates[0]), 
                dateTo: formatDate(selectedDates[1]), 
                guests,
                venueId,
            };

            console.log("Booking details being sent:", bookingDetails);

            const response = await fetch(
                `https://v2.api.noroff.dev/holidaze/bookings`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, 
                        "X-Noroff-API-Key": API_KEY, 
                    },
                    body: JSON.stringify(bookingDetails),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API error response:", errorData);
                throw new Error(
                    errorData.errors?.[0]?.message ||
                        "Failed to book the venue."
                );
            }

            const data = await response.json();
            console.log("Booking successful! Details:", data.data);

            setSuccessMessage(
                `Booking successful! You can view all your bookings on your profile page`
            );

            addBookedDatesToDisabled(selectedDates[0], selectedDates[1]);
        } catch (error) {
            console.error("Error booking the venue:", error);
            setErrorMessage(
                error.message || "An error occurred while booking."
            );
        } finally {
            setIsBooking(false);
        }
    };

    const isDateDisabled = (date) => {
        return disabledDates.some(
            (disabledDate) =>
                disabledDate.toDateString() === date.toDateString()
        );
    };

    
    const tileClassName = ({ date }) => {
        if (isDateDisabled(date)) {
            return styles.occupied; 
        }
        return null;
    };

    
    const handleDateChange = (value) => {
        console.log("Raw selected dates:", value);
        setSelectedDates(value);
    };

    return (
        <section className={styles.bookingSection}>
            <div className={styles.calendarContainer}>
                <h3>Select Your Dates</h3>
                <Calendar
                    selectRange={true} 
                    onChange={handleDateChange} 
                    value={selectedDates} 
                    minDate={new Date()} 
                    tileDisabled={({ date }) => isDateDisabled(date)} 
                    tileClassName={tileClassName}
                />
            </div>
            <div className={styles.bookingDetails}>
                <h3>Booking Details</h3>
                <div className={styles.bookingGuests}>
                    <label>
                        Guests:
                        <input
                            type="number"
                            min="1"
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))} 
                            className={styles.input}
                        />
                    </label>
                    <Button
                        onClick={handleBooking}
                        disabled={isBooking}
                        className={styles.bookButton}
                    >
                        {isBooking ? "Booking..." : "Book Now"}
                    </Button>
                    {successMessage && (
                        <p className={styles.successMessage}>
                            {successMessage}
                        </p>
                    )}
                    {errorMessage && (
                        <p className={styles.errorMessage}>{errorMessage}</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BookingSection;
