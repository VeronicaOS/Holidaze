import React, { useState } from "react";
import { updateVenue } from "../../../utils/updateVenue";
import styles from "./updateVenue.module.css"; // Add styles for your modal
import VenueForm from "../createVenue/venueForm/venueForm";
import Button from "../../../components/button/button";

const UpdateVenueModal = ({ venue, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: venue.name || "",
        description: venue.description || "",
        media: venue.media?.[0]?.url || "",
        mediaAlt: venue.media?.[0]?.alt || "",
        price: venue.price || 0,
        maxGuests: venue.maxGuests || 0,
        wifi: venue.meta?.wifi || false,
        parking: venue.meta?.parking || false,
        breakfast: venue.meta?.breakfast || false,
        pets: venue.meta?.pets || false,
        address: venue.location?.address || "",
        city: venue.location?.city || "",
        zip: venue.location?.zip || "",
        country: venue.location?.country || "",
        continent: venue.location?.continent || "",
    });

    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => {
            if (type === "checkbox") {
                return { ...prev, [name]: checked };
            }
            if (type === "number") {
                return { ...prev, [name]: value ? parseInt(value, 10) : "" };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsUpdating(true);
            setError(null);

            const updatedData = {
                name: formData.name,
                description: formData.description,
                media: formData.media
                    ? [
                          {
                              url: formData.media,
                              alt: formData.mediaAlt || "Venue image",
                          },
                      ]
                    : [],
                price: parseInt(formData.price, 10),
                maxGuests: parseInt(formData.maxGuests, 10),
                meta: {
                    wifi: Boolean(formData.wifi),
                    parking: Boolean(formData.parking),
                    breakfast: Boolean(formData.breakfast),
                    pets: Boolean(formData.pets),
                },
                location: {
                    address: formData.address || null,
                    city: formData.city || null,
                    zip: formData.zip || null,
                    country: formData.country || null,
                    continent: formData.continent || null,
                },
            };

            const updatedVenue = await updateVenue(venue.id, updatedData);

            onUpdate(updatedVenue);
            onClose();
        } catch (err) {
            console.error("Error updating venue:", err.message || err);
            setError(err.message || "Failed to update venue.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Update Venue</h2>
                <form onSubmit={handleSubmit}>
                    <VenueForm
                        formData={formData}
                        handleChange={handleChange}
                        isLoading={isUpdating}
                        error={error}
                    />
                    <div className={styles.actions}>
                        <Button
                            type="button"
                            onClick={onClose}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isUpdating}
                        >
                            {isUpdating ? "Updating..." : "Update Venue"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateVenueModal;
