import React from "react";
import HomeCard from "../../../components/cards/homeCard/homeCard";
import backgroundImage from "../../../assets/images/hero/hero-image.jpg";
import profileImage from "../../../assets/images/profileImage/profileImage.png";
import styles from "./petSection.module.css";
import sharedStyles from "../../styles.module.css";

const PetSection = () => {
    // Mock data for identical cards
    const mockCardData = {
        title: "Pet-Friendly Destinations",
        description: "Explore the world with your furry friends! 🌎✈️",
        image: backgroundImage,
        profileImage: profileImage,
    };

    // Array to render 4 identical cards
    const cards = Array(4).fill(mockCardData);

    return (
        <div className={sharedStyles.wrapper}>
            <section className={styles.petSection}>
                <h2 className={styles.sectionTitle}>Pet Travel Mockup</h2>
                <div className={styles.cardsContainer}>
                    {cards.map((card, index) => (
                        <HomeCard
                            key={index}
                            image={card.image}
                            profileImage={card.profileImage}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PetSection;
