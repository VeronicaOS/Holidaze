import React from "react";
import styles from "../createVenuePage.module.css";

const VenueForm = ({ formData, handleChange, error }) => {
    return (
        <>
            {/* Name Input */}
            <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            {/* Description */}
            <div className={styles.inputGroup}>
                <label htmlFor="description" className={styles.label}>
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            {/* Media URL */}
            <div className={styles.inputGroup}>
                <label htmlFor="media" className={styles.label}>
                    Media URL:
                </label>
                <input
                    type="url"
                    id="media"
                    name="media"
                    value={formData.media}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="mediaAlt" className={styles.label}>
                    Media Alt Text:
                </label>
                <input
                    type="text"
                    id="mediaAlt"
                    name="mediaAlt"
                    value={formData.mediaAlt}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>

            {/* Price */}
            <div className={styles.inputGroup}>
                <label htmlFor="price" className={styles.label}>
                    Price per night:
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            {/* Max Guests */}
            <div className={styles.inputGroup}>
                <label htmlFor="maxGuests" className={styles.label}>
                    Maximum Guests:
                </label>
                <input
                    type="number"
                    id="maxGuests"
                    name="maxGuests"
                    value={formData.maxGuests}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            {/* Meta */}
            <fieldset className={styles.metaGroup}>
                <legend>Amenities</legend>
                <label>
                    <input
                        type="checkbox"
                        name="wifi"
                        checked={formData.wifi}
                        onChange={handleChange}
                    />
                    Wifi
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="parking"
                        checked={formData.parking}
                        onChange={handleChange}
                    />
                    Parking
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="breakfast"
                        checked={formData.breakfast}
                        onChange={handleChange}
                    />
                    Breakfast
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="pets"
                        checked={formData.pets}
                        onChange={handleChange}
                    />
                    Pets allowed
                </label>
            </fieldset>

            {/* Location */}
            <fieldset className={styles.locationGroup}>
                <legend>Location</legend>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>
                <label>
                    Zip:
                    <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>
                <label>
                    Continent:
                    <input
                        type="text"
                        name="continent"
                        value={formData.continent}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>
            </fieldset>

            {/* Error Message */}
            {error && <p className={styles.error}>{error}</p>}
        </>
    );
};

export default VenueForm;
