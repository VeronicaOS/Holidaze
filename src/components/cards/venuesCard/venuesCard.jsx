import React from "react";
import styles from "./venuesCard.module.css";
import { Link } from "react-router-dom";

const VenueCard = ({ id, title, price, imageUrl, imageAlt }) => {
    return (
        <Link to={`/venues/${id}`} className={styles.link}>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    <img
                        src={imageUrl || "/default-placeholder.png"}
                        alt={imageAlt || "No image available"}
                        className={styles.image}
                    />
                    <div className={styles.overlay}>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.price}>Price: ${price}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VenueCard;
