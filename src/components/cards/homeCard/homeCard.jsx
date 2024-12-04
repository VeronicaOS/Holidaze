import React from "react";
import styles from "./homeCard.module.css";

const HomeCard = ({ image, profileImage, title, description }) => {
    return (
        <div className={styles.card}>
            <div
                className={styles.backgroundImage}
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className={styles.profile}>
                    <img
                        src={profileImage}
                        alt="profile"
                        className={styles.profileImage}
                    />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;
