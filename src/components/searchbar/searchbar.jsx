import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVenues } from "../../utils/fetchVenues";
import styles from "./searchbar.module.css";
import Button from "../button/button";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [allVenues, setAllVenues] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadVenues = async () => {
            try {
                const venues = await fetchVenues();
                setAllVenues(venues);
            } catch (error) {
                console.error("Error loading venues:", error);
            }
        };

        loadVenues();
    }, []);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchQuery(inputValue);

        if (inputValue.trim()) {
            const matches = allVenues.filter((venue) =>
                venue.name
                    ?.toLowerCase()
                    .includes(inputValue.trim().toLowerCase())
            );
            setSearchResults(matches);
        } else {
            setSearchResults([]);
        }
    };

    const handleVenueClick = (venue) => {
        setSearchQuery(venue.name);
        setSelectedVenue(venue);
        setSearchResults([]);
    };

    const handleSearch = () => {
        if (selectedVenue) {
            navigate(`/venues/${selectedVenue.id}`);
        } else {
            alert("Please select a venue from the list or type its full name.");
        }
    };

    return (
        <div className={styles.searchContainer}>
            {/* Search input */}
            <input
                type="text"
                placeholder="I want to go to"
                value={searchQuery}
                onChange={handleInputChange}
                className={styles.searchInput}
            />
            <Button onClick={handleSearch}>Search</Button>

            {/* Display search results */}
            {searchQuery && (searchResults.length > 0 || !selectedVenue) && (
                <ul className={styles.searchResults}>
                    {searchResults.length > 0
                        ? searchResults.map((venue) => (
                              <li
                                  key={venue.id}
                                  onClick={() => handleVenueClick(venue)}
                                  className={styles.searchResultItem}
                              >
                                  {venue.name}
                              </li>
                          ))
                        : !selectedVenue && (
                              <li className={styles.noResults}>
                                  No venues found for "{searchQuery}"
                              </li>
                          )}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
