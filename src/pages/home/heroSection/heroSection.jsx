import React from "react";
import SearchBar from "../../../components/searchbar/searchbar";
import styles from "./heroSection.module.css";
import sharedStyles from "../../styles.module.css";

const HeroSection = () => {
    return (
        <section className={styles.heroImage}>
            <div className={sharedStyles.wrapper}>
                <div className={styles.heroSection}>
                    <h1>Your perfect stay just a click away</h1>
                    <SearchBar /> {/* Include the SearchBar component */}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
