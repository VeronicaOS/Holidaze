import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVenues } from "../../utils/fetchVenues"; // Ensure this fetch function works
import styles from "./searchbar.module.css";
import Button from "../button/button";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query
    const [searchResults, setSearchResults] = useState([]); // State for search results
    const [allVenues, setAllVenues] = useState([]); // State for all venues
    const [selectedVenue, setSelectedVenue] = useState(null); // State for the selected venue
    const navigate = useNavigate(); // For navigation to detail page

    useEffect(() => {
        // Fetch all venues when the component mounts
        const loadVenues = async () => {
            try {
                const venues = await fetchVenues();
                setAllVenues(venues);
                console.log("Fetched all venues:", venues); // Debugging
                console.log(
                    "Venue names:",
                    venues.map((venue) => venue.name)
                ); // Debugging
            } catch (error) {
                console.error("Error loading venues:", error);
            }
        };

        loadVenues();
    }, []);

    // Handle input changes and filter venues
    const handleInputChange = (e) => {
        const inputValue = e.target.value; // Do not trim or normalize here
        setSearchQuery(inputValue);

        if (inputValue.trim()) {
            // Normalize only for filtering
            const matches = allVenues.filter((venue) =>
                venue.name
                    ?.toLowerCase()
                    .includes(inputValue.trim().toLowerCase())
            );
            console.log("Matches for query:", matches); // Debugging
            setSearchResults(matches); // Filter venues by name
        } else {
            setSearchResults([]); // Clear results if input is empty
        }
    };

    // Handle selecting a venue from the list
    const handleVenueClick = (venue) => {
        setSearchQuery(venue.name); // Auto-fill the search bar
        setSelectedVenue(venue); // Save the selected venue
        setSearchResults([]); // Clear search results after selection
    };

    // Handle search button click
    const handleSearch = () => {
        if (selectedVenue) {
            navigate(`/venues/${selectedVenue.id}`); // Navigate to the selected venue's detail page
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
