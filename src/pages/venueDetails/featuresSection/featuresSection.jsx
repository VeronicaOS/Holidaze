import React from "react";
import styles from "./featuresSection.module.css";

const FeaturesSection = ({ venue }) => {
    const { meta } = venue || {};

    return (
        <div className={styles.venueFeatures}>
            <div className={styles.metaInfo}>
                <h2>Amenities</h2>
                <ul>
                    <li>
                        <strong>Breakfast:</strong>{" "}
                        {meta?.breakfast ? "Yes" : "No"}
                    </li>
                    <li>
                        <strong>Parking:</strong> {meta?.parking ? "Yes" : "No"}
                    </li>
                    <li>
                        <strong>Pets Allowed:</strong>{" "}
                        {meta?.pets ? "Yes" : "No"}
                    </li>
                    <li>
                        <strong>WiFi:</strong> {meta?.wifi ? "Yes" : "No"}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FeaturesSection;
