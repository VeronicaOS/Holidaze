import React from "react";
import styles from "./detailsSection.module.css";
import FeaturesSection from "../featuresSection/featuresSection";

const DetailsSection = ({ venue }) => {
    return (
        <section className={styles.topDetailsSection}>
            <div className={styles.imageSection}>
                <img
                    src={venue.media[0]?.url || "/default-placeholder.png"}
                    alt={venue.media[0]?.alt || "Venue image"}
                    className={styles.image}
                />
            </div>
            <div className={styles.detailsFeatures}>
                <div className={styles.detailsSection}>
                    <h1 className={styles.title}>{venue.name}</h1>
                    <p className={styles.location}>
                        {venue.location.city}, {venue.location.country}
                    </p>
                    <p className={styles.maxGuests}>
                        <strong>Maximun amount of guests: </strong>
                        {venue.maxGuests}
                    </p>
                    <p className={styles.description}>{venue.description}</p>
                </div>
                <FeaturesSection
                    venue={venue}
                    className={styles.FeaturesSection}
                />
            </div>
        </section>
    );
};

export default DetailsSection;
