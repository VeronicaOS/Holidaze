import { BASE_URL, API_KEY } from "../api/constants";

export const fetchVenues = async () => {
    const venues = [];
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
        const url = `${BASE_URL}/holidaze/venues?page=${currentPage}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Noroff-API-Key": API_KEY,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch venues: Page ${currentPage}`);
            }

            const data = await response.json();
            venues.push(...data.data); // Merge current page data into the venues array

            // Check if there's another page
            hasNextPage = data.meta?.isLastPage === false;
            currentPage++;
        } catch (error) {
            console.error(
                `Error fetching venues on page ${currentPage}:`,
                error
            );
            break;
        }
    }

    return venues;
};
