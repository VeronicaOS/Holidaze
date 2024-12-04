import React, { useState, useEffect } from "react";
import { useProfile } from "../../context/profileContext";
import VenueCard from "../../components/cards/venuesCard/venuesCard";
import { fetchVenues } from "../../utils/fetchVenues";
import styles from "./venuesPage.module.css";
import sharedStyles from "../styles.module.css";
import Button from "../../components/button/button";

const VenuesPage = () => {
    const { profile } = useProfile();
    const [venues, setVenues] = useState([]);
    const [visibleVenues, setVisibleVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    useEffect(() => {}, [profile]);

    useEffect(() => {
        document.title = "Holidaze - Venues Page";
    }, []);

    useEffect(() => {
        const loadVenues = async () => {
            try {
                const allVenues = await fetchVenues();
                setVenues(allVenues);
                setVisibleVenues(allVenues.slice(0, ITEMS_PER_PAGE));
            } catch (err) {
                setError("Failed to load venues. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadVenues();
    }, []);

    const loadMore = () => {
        const nextPage = page + 1;
        const startIndex = nextPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
        const endIndex = nextPage * ITEMS_PER_PAGE;
        setVisibleVenues((prev) => [
            ...prev,
            ...venues.slice(startIndex, endIndex),
        ]);
        setPage(nextPage);
    };

    if (loading) {
        return <p>Loading venues...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.container}>
            <div className={sharedStyles.wrapper}>
                <h1 className={styles.heading}>Our Venues</h1>
                <div className={styles.grid}>
                    {visibleVenues.map((venue) => (
                        <VenueCard
                            key={venue.id}
                            id={venue.id}
                            title={venue.name}
                            price={venue.price}
                            imageUrl={venue.media[0]?.url}
                            imageAlt={venue.media[0]?.alt}
                        />
                    ))}
                </div>
                {/* Show Load More button if there are more venues to load */}
                {visibleVenues.length < venues.length && (
                    <Button onClick={loadMore} className={styles.loadMore}>
                        Load More
                    </Button>
                )}
            </div>
        </div>
    );
};

export default VenuesPage;
