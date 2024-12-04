import React, { useEffect, useState } from "react";
import { useProfile } from "../../context/profileContext";
import { useParams } from "react-router-dom";
import DetailsSection from "./detailsSection/detailsSection";
import BookingSection from "./bookingSection/bookingSection";
import sharedStyles from "../styles.module.css";
import { fetchVenueById } from "../../utils/fetchVenueDetails"; // Import the new function

const VenueDetailsPage = () => {
    const { profile } = useProfile(); // Access the profile from ProfileContext
    const { id } = useParams(); // Get the venue ID from the URL
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {}, [profile]);
    useEffect(() => {
        document.title = "Holidaze - Venue details Page";
    }, []);

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const venueData = await fetchVenueById(id);
                console.log("Fetched venue data:", venueData); // Log venue data for debugging
                setVenue(venueData); // Store venue data
            } catch (err) {
                console.error("Error fetching venue:", err);
                setError("Could not load venue details");
            } finally {
                setLoading(false);
            }
        };

        fetchVenue();
    }, [id]);

    if (loading) {
        return <p>Loading venue details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Safely extract bookings from venue data or default to an empty array
    const bookings = venue?.bookings || [];

    return (
        <div className={sharedStyles.wrapper}>
            <div className={sharedStyles.mainPadding}>
                <div>
                    <DetailsSection venue={venue} />
                    {/* Pass bookings directly to BookingSection */}
                    <BookingSection venueId={venue.id} bookings={bookings} />
                </div>
            </div>
        </div>
    );
};

export default VenueDetailsPage;
