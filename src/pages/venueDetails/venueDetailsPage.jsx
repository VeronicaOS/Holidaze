import React, { useEffect, useState } from "react";
import { useProfile } from "../../context/profileContext";
import { useParams } from "react-router-dom";
import DetailsSection from "./detailsSection/detailsSection";
import BookingSection from "./bookingSection/bookingSection";
import sharedStyles from "../styles.module.css";
import { fetchVenueById } from "../../utils/fetchVenueDetails";

const VenueDetailsPage = () => {
    const { profile } = useProfile();
    const { id } = useParams();
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
                setVenue(venueData);
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
